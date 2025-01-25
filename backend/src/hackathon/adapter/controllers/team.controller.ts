import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  BadRequestException,
  NotFoundException,
  UseGuards,
  Request,
  Inject,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  HackathonDocument,
  TEAM_STATUS,
} from 'src/hackathon/infrastructure/database/schemas';
import { InteractionDocument } from 'src/hackathon/infrastructure/database/schemas/interaction.schema';
import { NotificationDocument } from 'src/hackathon/infrastructure/database/schemas/notification.schema';
import { TeamDocument } from 'src/hackathon/infrastructure/database/schemas/team.schema';
import { urlFe } from 'src/main';
import { ProjectDocument } from 'src/project/infrastructure/database/schemas';
import { Auth2Service } from 'src/user/adaper/services/auth2.service';
import { JwtAuthGuard } from 'src/user/domain/common/guards/jwtAuth.guard';
import { sendEmail } from 'src/user/domain/services/email.service';
import { templateInviteHTML } from 'src/user/infrastructure/constants/template-email-invite-member';
import { UserDocument } from 'src/user/infrastructure/database/schemas';

@Controller('teams')
export class TeamController {
  constructor(
    @Inject(Auth2Service)
    private readonly auth2Service: Auth2Service,
    @InjectModel(TeamDocument.name)
    private readonly teamModel: Model<TeamDocument>,
    @InjectModel(HackathonDocument.name)
    private readonly hackathonModel: Model<HackathonDocument>,
    @InjectModel(UserDocument.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(NotificationDocument.name)
    private readonly notificationModel: Model<NotificationDocument>,
    @InjectModel(ProjectDocument.name)
    private readonly projectModel: Model<ProjectDocument>,
    @InjectModel(InteractionDocument.name)
    private readonly interactionModel: Model<InteractionDocument>,
  ) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createTeam(
    @Body('hackathonId') hackathonId: string,
    @Body('teamName') teamName: string,
    @Request() request: any,
  ) {
    const leaderId = request.user._props.id as string;
    const hackathon = await this.hackathonModel.findById(hackathonId);
    if (!hackathon) {
      throw new BadRequestException('Hackathon not found.');
    }

    const team = new this.teamModel({
      hackathonId,
      name: teamName,
      leaderId,
      members: [new Types.ObjectId(leaderId)], // The leader is the first member
    });

    return await team.save();
  }

  @Post('update')
  async updateTeam(
    @Body('teamId') teamId: string,
    @Body('teamName') teamName: string,
  ) {
    const Team = await this.teamModel.findById(teamId);
    if (!Team) {
      throw new BadRequestException('Team not found.');
    }
    Team.name = teamName;
    return await Team.save();
  }

  @Post(':id/add-member')
  async addMember(
    @Param('id') teamId: string,
    @Body('memberId') memberId: string,
  ) {
    const team = await this.teamModel.findById(teamId);
    if (!team) {
      throw new BadRequestException('Team not found.');
    }

    const hackathon = await this.hackathonModel.findById(team.hackathonId);
    if (!hackathon) {
      throw new BadRequestException('Hackathon not found.');
    }

    if (team.members.length >= hackathon.teamRequirement?.max) {
      throw new BadRequestException(
        `Team cannot have more than ${hackathon.teamRequirement?.max} members.`,
      );
    }

    team.members.push(new Types.ObjectId(memberId));
    return await team.save();
  }

  @Post(':id/remove-member')
  async removeMember(
    @Param('id') teamId: string,
    @Body('memberId') memberId: string,
  ) {
    const team = await this.teamModel.findById(teamId);
    if (!team) {
      throw new BadRequestException('Team not found.');
    }

    if (!team.members.includes(new Types.ObjectId(memberId))) {
      throw new BadRequestException('Member not found in the team.');
    }

    const arr = team.members.filter((member) => member.toString() !== memberId);
    team.members = arr;

    // remove projects user
    await this.userModel.findByIdAndUpdate(
      memberId,
      {
        $pull: { projects: team.projects },
      },
      { new: true },
    );
    team.projects?.map(async (project) => {
      // remove createBy in project
      await this.projectModel.findByIdAndUpdate(
        project,
        {
          $pull: { createdBy: new Types.ObjectId(memberId) },
        },
        { new: true },
      );
    });

    // change status of registered user => looking for teamate
    await this.hackathonModel.updateOne(
      { _id: team.hackathonId, 'registerUsers.userId': memberId },
      { $set: { 'registerUsers.$.status': TEAM_STATUS.FINDING_TEAMATE } },
    );

    await this.interactionModel.findOneAndUpdate(
      {
        user_id: memberId,
        hackathon: team.hackathonId,
        interaction_type: 'join',
      },
      {
        $set: {
          status: TEAM_STATUS.FINDING_TEAMATE, // Trạng thái mới
        },
      },
    );
    return await team.save();
  }

  @Post(':id/set-leader')
  async setLeader(
    @Param('id') teamId: string,
    @Body('newLeaderId') newLeaderId: string,
  ) {
    const team = await this.teamModel.findById(teamId);
    if (!team) {
      throw new BadRequestException('Team not found.');
    }

    if (!team.members.includes(new Types.ObjectId(newLeaderId))) {
      throw new BadRequestException('New leader must be a member of the team.');
    }

    team.leaderId = new Types.ObjectId(newLeaderId);
    return await team.save();
  }

  @Get('hackathon/:hackathonId')
  async getTeamsByHackathon(@Param('hackathonId') hackathonId: string) {
    return await this.teamModel
      .find({ hackathonId: hackathonId, status: 'active' })
      .populate([
        {
          path: 'leaderId',
          model: 'UserDocument',
          select: '_id fullname avatar email settingRecommend',
        },
        {
          path: 'members',
          model: 'UserDocument',
          select: '_id fullname avatar email settingRecommend',
        },
      ])
      .exec();
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-team/:hackathonId')
  async getMyTeamByHackathon(
    @Param('hackathonId') hackathonId: string,
    @Request() request: any,
  ) {
    const userId = request.user._props.id;
    return await this.teamModel
      .findOne({
        hackathonId: hackathonId,
        members: { $in: [new Types.ObjectId(userId)] },
        status: 'active',
      })
      .populate([
        {
          path: 'leaderId',
          model: 'UserDocument',
          select: '_id fullname avatar email settingRecommend',
        },
        {
          path: 'members',
          model: 'UserDocument',
          select: '_id fullname avatar email settingRecommend',
        },
        {
          path: 'invitations',
          model: 'TeamDocument',
          populate: [
            {
              path: 'leaderId',
              model: 'UserDocument',
              select: '_id fullname avatar email settingRecommend',
            },
            {
              path: 'members',
              model: 'UserDocument',
              select: '_id fullname avatar email settingRecommend',
            },
          ],
        },
      ])
      .exec();
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-invitation/:hackathonId')
  async getMyInvitation(
    @Param('hackathonId') hackathonId: string,
    @Request() request: any,
  ) {
    const userId = request.user._props.id;
    const team = await this.teamModel.findOne({
      hackathonId: hackathonId,
      members: { $in: [new Types.ObjectId(userId)] },
      status: 'active',
    });
    return await this.teamModel
      .find({
        hackathonId: hackathonId,
        status: 'active',
        invitations: { $in: [team._id] },
      })
      .populate([
        {
          path: 'leaderId',
          model: 'UserDocument',
          select: '_id fullname avatar email settingRecommend',
        },
        {
          path: 'members',
          model: 'UserDocument',
          select: '_id fullname avatar email settingRecommend',
        },
      ])
      .exec();
  }

  @Post(':teamId/send-invite-member/:hackathonId')
  async sendInviteMembers(
    @Param('teamId') teamId: string,
    @Param('hackathonId') hackathonId: string,
    @Body() body: { emails: string[] },
  ) {
    const team = await this.teamModel.findById(teamId).populate({
      path: 'leaderId',
      model: 'UserDocument',
      select: '_id fullname avatar email settingRecommend',
    });
    if (!team) throw new BadRequestException();
    const hackathon = await this.hackathonModel.findById(hackathonId);
    if (!hackathon) throw new BadRequestException();
    const { emails } = body;
    const users = await this.userModel
      .find({ email: { $in: emails } })
      .select('_id email isUserSystem');
    const objHackathon = {
      name: hackathon.hackathonName,
      themes: hackathon.hackathonTypes.join(','),
      time: `${hackathon.submissions.start} - ${hackathon.submissions.deadline}`,
      location: 'Online',
    };
    const senderEmail = (team.leaderId as any)?.email;
    const senderName = (team.leaderId as any)?.fullname;

    await Promise.all(
      users.map(async (item) => {
        const user = item as any;

        const paramsToken = {
          email: user.email,
          hackathonId,
          teamId,
        };

        const token = this.auth2Service.generateTokenInvite(paramsToken);
        const link = `/Hackathon-detail/${hackathonId}/auto-register?token=${token}&email=${encodeURIComponent(user.email)}`;
        const noti = await this.notificationModel.create({
          type: 'invitation',
          sender: {
            id: (team.leaderId as any)?._id,
            avatar: (team.leaderId as any)?.avatar,
            type: 'user',
            name: senderName,
          },
          content: `Hi there! ${senderName} has invited you to join their team for the upcoming hackathon ${hackathon.hackathonName}.This is an incredible opportunity to collaborate, learn, and potentially win amazing prizes. Click on the link below to accept the invitation and secure your spot on the team.`,
          title: 'You ve Been Invited to Join a Team',
          additionalData: {
            hackathonName: hackathon.hackathonName,
            linkInvite: link,
            linkDetails: `/Hackathon-detail/${hackathon._id.toString()}/overview`,
          },
        });
        if (user?._id) {
          await this.userModel.findByIdAndUpdate(user?._id, {
            $push: { notifications: noti._id },
          });
        }
        if (user?.email && user?.isUserSystem) {
          await this.sendMailInviteUser(
            hackathonId,
            senderName,
            senderEmail,
            '',
            user.email,
            urlFe + link,
            objHackathon,
          );
        }
      }),
    );
    return 'ok';
  }

  async sendMailInviteUser(
    hackathonId: string,
    senderName: string,
    senderEmail: string,
    receiverName: string,
    receiverEmail: string,
    linkInvite: string,
    objHackathon: any,
  ) {
    await sendEmail(
      receiverEmail,
      templateInviteHTML(
        linkInvite,
        `${urlFe}/Hackathon-detail/${hackathonId}/overview`,
        senderName,
        receiverName,
        senderEmail,
        objHackathon.name,
        objHackathon.time,
        objHackathon.location,
        objHackathon.themes,
      ),
      'Join our Team Hackathon',
      'Send mail successfull',
    );
  }

  @Post(':teamId/invite/:invitedTeamId')
  async inviteTeam(
    @Param('teamId') teamId: string,
    @Param('invitedTeamId') invitedTeamId: string,
  ) {
    const team = await this.teamModel.findById(teamId).populate({
      path: 'leaderId',
      model: 'UserDocument',
      select: '_id fullname avatar email settingRecommend',
    });
    const invitedTeam = await this.teamModel.findById(invitedTeamId);

    if (!team || !invitedTeam) {
      throw new NotFoundException('One or both teams not found.');
    }

    // Check if either team has already merged
    if (team.status === 'merged' || invitedTeam.status === 'merged') {
      throw new BadRequestException(
        'One or both teams have already been merged.',
      );
    }

    // Calculate total members
    const totalMembers = team.members.length + invitedTeam.members.length;
    const hackathon = await this.hackathonModel.findById(team.hackathonId);

    if (totalMembers > hackathon.teamRequirement?.max) {
      throw new BadRequestException(
        `The merged team exceeds the max size of ${hackathon.teamRequirement?.max}.`,
      );
    }

    if (!invitedTeam.invitations.includes(new Types.ObjectId(teamId))) {
      invitedTeam.invitations.push(new Types.ObjectId(teamId));
      const noti = await this.notificationModel.create({
        type: 'invitation',
        sender: {
          id: (team.leaderId as any)?._id,
          avatar: (team.leaderId as any)?.avatar,
          type: 'user',
          name: (team.leaderId as any)?.fullname,
        },
        content: `Hi there! ${(team.leaderId as any)?.fullname} has invited your team to combine their team for the upcoming hackathon ${hackathon.hackathonName}.This is an incredible opportunity to collaborate, learn, and potentially win amazing prizes. Click on the link below to accept the invitation and secure your spot on the team.`,
        title: 'You ve Been Invited to combine Team',
        additionalData: {
          hackathonName: hackathon.hackathonName,
          linkDetails: `/Hackathon-detail/${hackathon._id.toString()}/my-project`,
        },
      });
      if (invitedTeam?.leaderId) {
        await this.userModel.findByIdAndUpdate(invitedTeam?.leaderId, {
          $push: { notifications: noti._id },
        });
      }
      await invitedTeam.save();
      return 'ok';
    }
    return 'Already invited this team.';
  }

  @Post(':teamId/delete-invite/:invitedTeamId')
  async deleteTeam(
    @Param('teamId') teamId: string,
    @Param('invitedTeamId') invitedTeamId: string,
  ) {
    const team = await this.teamModel.findById(teamId).populate({
      path: 'leaderId',
      model: 'UserDocument',
      select: '_id fullname avatar email settingRecommend',
    });
    const invitedTeam = await this.teamModel.findById(invitedTeamId);

    if (!team || !invitedTeam) {
      throw new NotFoundException('One or both teams not found.');
    }

    if (invitedTeam.invitations.includes(new Types.ObjectId(teamId))) {
      const arr = invitedTeam.invitations.filter(
        (i) => i.toString() !== teamId,
      );
      invitedTeam.invitations = arr;
      await invitedTeam.save();
      return 'ok';
    }
    return 'Already not invited this team yet.';
  }

  @Post(':teamId/merge/:invitedTeamId')
  async mergeTeams(
    @Param('teamId') teamId: string,
    @Param('invitedTeamId') invitedTeamId: string,
  ) {
    const team = await this.teamModel.findById(teamId);
    const invitedTeam = await this.teamModel.findById(invitedTeamId);

    if (!team || !invitedTeam) {
      throw new NotFoundException('One or both teams not found.');
    }

    // Check if the invitation exists
    if (!invitedTeam.invitations.includes(new Types.ObjectId(teamId))) {
      throw new BadRequestException('This team was not invited.');
    }

    // Merge members
    const mergedMembers = [
      ...new Set([...team.members, ...invitedTeam.members]),
    ];

    // Check max members limit
    const hackathon = await this.hackathonModel.findById(team.hackathonId);
    if (mergedMembers.length > hackathon.teamRequirement?.max) {
      throw new BadRequestException(
        `The merged team exceeds the max size of ${hackathon.teamRequirement?.max}.`,
      );
    }
    const mergedProjects = [
      ...new Set([...team.members, ...invitedTeam.members]),
    ];
    // Create merged team
    const newTeam = await this.teamModel.create({
      hackathonId: team.hackathonId,
      name: `${team.name}-${invitedTeam.name}`,
      leaderId: team.leaderId, // Default: leader of teamId
      members: mergedMembers,
      projects: mergedProjects,
    });

    await this.projectModel.updateMany(
      { _id: { $in: mergedProjects } },
      { createdBy: mergedMembers },
    );

    mergedMembers.map(async (mem) => {
      await this.userModel.findByIdAndUpdate(mem, {
        $addToSet: { projects: [...mergedProjects] },
      });
    });

    // Mark both teams as merged
    team.status = 'merged';
    invitedTeam.status = 'merged';
    await team.save();
    await invitedTeam.save();

    return newTeam;
  }

  @Post(':teamId/decline/:invitedTeamId')
  async declineInvitation(
    @Param('teamId') teamId: string,
    @Param('invitedTeamId') invitedTeamId: string,
  ) {
    const team = await this.teamModel.findById(teamId);

    if (!team) {
      throw new NotFoundException('Team not found.');
    }

    team.invitations = team.invitations.filter(
      (id) => id.toString() !== invitedTeamId,
    );
    await team.save();
    return 'ok';
  }
}
