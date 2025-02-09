import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Request,
  Post,
  Put,
  Query,
  UseGuards,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Project } from 'src/project/domain/entities/project.entity';
import { GetProjectQuery } from 'src/project/application/queries/get-project/get-project.query';
import { UpdateProjectCommand } from 'src/project/application/commands/update-project/update-project.command';
import { DeleteProjectCommand } from 'src/project/application/commands/delete-project/delete-project.command';
import { GetProjectsQuery } from 'src/project/application/queries/get-projects/get-projects.query';
import { UpdateProjectDTO } from '../dto/update-project.dto';
import { GetProjectRegisteredHackathonQuery } from 'src/project/application/queries/get-projec-registered-hackathon/get-project-registered-hackathon.query';
import { FilterProjectsDto } from '../dto/search-filter-projects.dto';
import { SearchFilterProjectsQuery } from 'src/project/application/queries/search-filter-project/search-filter-project.query';
import { InjectModel } from '@nestjs/mongoose';
import { ProjectDocument } from 'src/project/infrastructure/database/schemas';
import { Model, Types } from 'mongoose';
import { sendEmail } from 'src/user/domain/services/email.service';
import { templateInviteHTML } from 'src/user/infrastructure/constants/template-email-invite-member';
import { Auth2Service } from 'src/user/adaper/services/auth2.service';
import { UserDocument } from 'src/user/infrastructure/database/schemas';
import {
  HackathonDocument,
  TEAM_STATUS,
} from 'src/hackathon/infrastructure/database/schemas';
import { JwtAuthGuard } from 'src/user/domain/common/guards/jwtAuth.guard';
import { InteractionDocument } from 'src/hackathon/infrastructure/database/schemas/interaction.schema';
import { v4 as uuidv4 } from 'uuid';
import { GetMembersProjectQuery } from 'src/project/application/queries/get-member-project/get-member-project.query';
import { urlFe } from 'src/main';
import { NotificationDocument } from 'src/hackathon/infrastructure/database/schemas/notification.schema';
import { templateConfirmRegisterHTML } from 'src/user/infrastructure/constants/template-email-confirm-register';
import { TeamDocument } from 'src/hackathon/infrastructure/database/schemas/team.schema';

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject(Auth2Service)
    private readonly auth2Service: Auth2Service,
    @InjectModel(ProjectDocument.name)
    private readonly projectModel: Model<ProjectDocument>,
    @InjectModel(UserDocument.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(HackathonDocument.name)
    private readonly hackathonModel: Model<HackathonDocument>,
    @InjectModel(InteractionDocument.name)
    private readonly interactionModel: Model<InteractionDocument>,
    @InjectModel(NotificationDocument.name)
    private readonly notificationModel: Model<NotificationDocument>,
    @InjectModel(TeamDocument.name)
    private readonly teamModel: Model<TeamDocument>,
  ) {}

  @Get()
  async getAllProjects(@Query('page') page: number) {
    return await this.queryBus.execute(new GetProjectsQuery(page));
  }

  @Post('search')
  async search(@Body() filterDto: FilterProjectsDto) {
    return await this.queryBus.execute(
      new SearchFilterProjectsQuery(filterDto),
    );
  }

  @Post('search-tags')
  async searchTags(@Body() body: { type: string; hackathonId?: string }) {
    console.log('🚀 ~ ProjectController ~ searchTags ~ type:', body.type);
    let result;
    if (body.type === 'hackathon') {
      result = await this.hackathonModel.aggregate([
        { $unwind: '$hostName' },
        { $group: { _id: '$hostName' } },
        { $project: { _id: 0, value: '$_id', label: '$_id' } },
      ]);
    }
    if (body.type === 'project') {
      result = await this.projectModel.aggregate([
        { $unwind: '$builtWith' },
        { $group: { _id: '$builtWith' } },
        { $project: { _id: 0, value: '$_id', label: '$_id' } },
      ]);
    }
    if (body.type === 'user') {
      result = await this.userModel.aggregate([
        {
          $match: {
            registerHackathons: new Types.ObjectId(body.hackathonId), // Check if the hackathonId is present in the registerHackathons array
          },
        },
        { $unwind: '$settingRecommend.skills' },
        { $group: { _id: '$settingRecommend.skills' } },
        { $project: { _id: 0, value: '$_id', label: '$_id' } },
      ]);
    }
    return [{ value: 'All', label: 'All' }, ...result];
  }

  @Get(':id')
  async getProject(@Param('id') id: string) {
    return await this.queryBus.execute(new GetProjectQuery(id));
  }

  @Get(':userId/:hackathonId')
  async getRegisteredProjectTo(
    @Param('userId') userId: string,
    @Param('hackathonId') hackathonId: string,
  ) {
    return await this.queryBus.execute(
      new GetProjectRegisteredHackathonQuery({ userId, hackathonId }),
    );
  }

  @Get('get-members/:projectId/members')
  async getMembersOfProject(@Param('projectId') projectId: string) {
    return await this.queryBus.execute(new GetMembersProjectQuery(projectId));
  }

  @Post(':userId')
  async createProject(
    @Param('userId') userId: string,
    @Body()
    body: {
      title: string;
      hackathonId?: string;
      teamType?: string;
      teamId?: string;
    },
  ) {
    const { title, hackathonId, teamType, teamId } = body;
    const existingUser = await this.userModel.findById(userId);

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
    let projectNameId = `${title.trim().toLocaleLowerCase().replace(/ /g, '-')}`;
    const timestamp: number = Date.now();

    const existProject = await this.projectModel.findOne({ projectNameId });
    if (existProject) {
      projectNameId =
        projectNameId +
        `-${existProject._id.toString().slice(0, 4)}${timestamp.toString().slice(-4)}`;
    }
    if (teamId) {
      const existTeam = await this.teamModel.findById(teamId);
      if (!existTeam) {
        throw new NotFoundException(`Team with ID ${teamId} not found.`);
      }
      const createProject = new this.projectModel({
        owner: userId,
        projectTitle: title,
        projectNameId,
        teamName: existTeam.name,
        createdByUsername: existTeam.members,
        createdBy: existTeam.members,
        teamType,
      });

      const prjObj = await createProject.save();
      existTeam.projects.push(prjObj._id);
      await existTeam.save();
      if (hackathonId) {
        const existHackathon = await this.hackathonModel.findById(hackathonId);
        if (!existHackathon) {
          throw new NotFoundException(
            `Hackathon with ID ${hackathonId} not found.`,
          );
        }
        existHackathon.registedTeams.push(prjObj._id);
        await existHackathon.save();
      }
      existTeam.members.map(async (mem) => {
        await this.userModel.findByIdAndUpdate(
          mem,
          {
            $push: { projects: prjObj._id },
          },
          { new: true },
        );
      });
      return { projectId: prjObj._id.toString(), type: 'add-to-team' };
    } else {
      const createProject = new this.projectModel({
        owner: userId,
        projectTitle: title,
        projectNameId,
        teamName: 'Untitled',
        createdByUsername: [userId],
        createdBy: [userId],
        teamType,
      });

      const prjObj = await createProject.save();
      if (hackathonId) {
        const existHackathon = await this.hackathonModel.findById(hackathonId);
        if (!existHackathon) {
          throw new NotFoundException(
            `Hackathon with ID ${hackathonId} not found.`,
          );
        }
        existHackathon.registedTeams.push(prjObj._id);
        await existHackathon.save();
      }
      existingUser.projects.push(prjObj._id);
      await existingUser.save();
      return { projectId: prjObj._id.toString(), type: 'add-to-personal' };
    }
  }

  @Put(':id')
  async updateProject(
    @Param('id') id: string,
    @Body() project: UpdateProjectDTO,
  ): Promise<Project> {
    if (id == null) throw new Error('Id is empty');
    const result = this.commandBus.execute(
      new UpdateProjectCommand({ id: id, project: project }),
    );

    return result;
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: string): Promise<string> {
    if (id == null) throw new Error('Id is empty');
    const result = this.commandBus.execute(
      new DeleteProjectCommand({ id: id }),
    );

    return result;
  }

  @Post('block-project/:projectId/block')
  async blockTeamProject(
    @Param('projectId') projectId: string,
    @Body() body: { block: boolean },
  ): Promise<boolean> {
    const { block } = body;
    const project = await this.projectModel.findOneAndUpdate(
      { _id: projectId },
      { block: block },
      { new: true },
    );

    if (!project) throw new BadRequestException('Not found project');

    const hackathon = await this.hackathonModel.findById(
      project.registeredToHackathon,
    );

    const registerUsers = hackathon.registerUsers;

    registerUsers.forEach((item) => {
      if (project.createdBy.includes(new Types.ObjectId(item.userId))) {
        block
          ? (item.status = TEAM_STATUS.BLOCK)
          : (item.status = TEAM_STATUS.HAD_TEAM);
      }
    });

    await this.hackathonModel.findOneAndUpdate(
      { _id: hackathon._id },
      { registerUsers: registerUsers },
      { new: true },
    );

    return true;
  }

  @UseGuards(JwtAuthGuard)
  @Post(':projectId/submit-hackathon')
  async submitHackathon(
    @Param('projectId') projectId: string,
    @Request() request: any,
    @Body()
    body: {
      hackathonId: string;
      linkSubmitVideo: string;
      linkSubmitFile: string;
    },
  ) {
    const userId = request.user._props.id as string;
    const project = await this.projectModel.findById(projectId);
    if (!project) throw new NotFoundException();
    const hackathon = await this.hackathonModel.findById(body.hackathonId);
    if (!hackathon) throw new NotFoundException();
    const team = await this.teamModel.findOne({
      hackathonId: body.hackathonId,
      members: { $in: [new Types.ObjectId(userId)] },
      status: 'active',
    });
    project.isSubmmited = true;
    project.linkSubmitFile = body.linkSubmitFile;
    project.linkSubmitVideo = body.linkSubmitVideo;
    project.registeredToHackathon = hackathon._id;
    team.submittedProjectId = project._id;
    await team.save();
    await project.save();
    return 'ok';
  }

  @Post(':projectId/send-mail-invite')
  async sendMailInvite(
    @Param('projectId') projectId: string,
    @Body() body: { emails: string[] },
  ) {
    const project = await this.projectModel.findById(projectId).populate([
      {
        path: 'registeredToHackathon',
        model: 'HackathonDocument',
      },
      {
        path: 'owner',
        model: 'UserDocument',
        select: 'fullname email settingRecommend _id avatar',
      },
    ]);
    if (!project) throw new BadRequestException();
    const { emails } = body;
    const users = await this.userModel
      .find({ email: { $in: emails } })
      .select('_id email isUserSystem');
    const hackathon = project.registeredToHackathon as any;
    const hackathonId = hackathon._id.toString();
    const objHackathon = {
      name: hackathon.hackathonName,
      themes: hackathon.hackathonTypes.join(','),
      time: `${hackathon.submissions.start} - ${hackathon.submissions.deadline}`,
      location: 'Online',
    };
    const senderEmail = (project.owner as any)?.email;
    const senderName = (project.owner as any)?.fullname;

    await Promise.all(
      users.map(async (item) => {
        const user = item as any;

        const paramsToken = {
          email: user.email,
          hackathonId,
          projectId,
        };

        const token = this.auth2Service.generateTokenInvite(paramsToken);
        const link = `/Hackathon-detail/${hackathonId}/auto-register?token=${token}&email=${encodeURIComponent(user.email)}`;
        const noti = await this.notificationModel.create({
          type: 'invitation',
          sender: {
            id: (project.owner as any)?._id,
            avatar: (project.owner as any)?.avatar,
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
          await sendMailInviteUser(
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

  @Post(':id/check-invite-list')
  async checkInviteList(
    @Param('id') id: string,
    @Body() body: { emails: string[]; hackathonId: string },
  ) {
    const { emails, hackathonId } = body;
    const dataUser: any = {
      noAccount: [],
      registedAndHasTeam: [],
    };
    const existingHackathon = await this.hackathonModel.findById(hackathonId);
    if (!existingHackathon)
      throw new BadRequestException('Not found hackathon');

    await Promise.all(
      emails.map(async (email) => {
        const user = await this.userModel.findOne({ email });
        if (!user) dataUser.noAccount.push(email);
        else {
          const team = await this.teamModel.findOne({
            hackathonId: hackathonId,
            members: { $in: [user._id] },
            status: 'active',
          });
          const registerToHackathon = existingHackathon.registerUsers.find(
            (u) => u.userId.toString() === user._id.toString(),
          );
          if (registerToHackathon && team) {
            dataUser.registedAndHasTeam.push(email);
          }
        }
      }),
    );
    return dataUser;
  }

  @Post('accept-invite/auto-register')
  @UseGuards(JwtAuthGuard)
  async autoRegister(
    @Request() request: any,
    @Query('token') token: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/ban-types
    @Body() body: {},
  ) {
    const payload = this.auth2Service.extractPayload(token);
    const { email, hackathonId, projectId, teamId } = payload as any;
    const { user } = request;
    if (teamId) {
      if (user._props.email !== email)
        throw new BadRequestException('Not found user');
      const existingUser = await this.userModel.findOne({ email });
      if (!existingUser) throw new BadRequestException('Not found user');

      const existingHackathon = await this.hackathonModel.findById(hackathonId);
      if (!existingHackathon)
        throw new BadRequestException('Not found hackathon');
      const userId = existingUser._id.toString();

      const team = await this.teamModel.findById(teamId);
      if (!team) throw new BadRequestException('Not found team');
      const currentNum = team.members?.length ?? 0;
      let isOk = true;
      const teamRequirement = existingHackathon.teamRequirement;
      if (teamRequirement) {
        if (currentNum >= teamRequirement.max && teamRequirement.isRequire) {
          isOk = false;
        }
      }
      if (!isOk)
        throw new ConflictException(
          'This team is full. Please ask another team to join. ',
        );
      const registerToHackathon = existingHackathon.registerUsers.find(
        (user) => user.userId.toString() === userId,
      );

      if (!registerToHackathon) {
        existingUser.registerHackathons.push(existingHackathon._id);
        existingHackathon.registerUsers.push({
          userId: existingUser._id,
          status: TEAM_STATUS.HAD_TEAM,
        });
        team.members.push(new Types.ObjectId(userId));
        await team.save();
        await existingHackathon.save();
        await this.projectModel.updateMany(
          { _id: { $in: team.projects } },
          { $addToSet: { createdBy: existingUser._id } },
        );
        const noti = await this.notificationModel.create({
          type: 'participation_confirmation',
          sender: {
            id: existingHackathon._id,
            avatar: existingHackathon.thumbnail,
            type: 'hackathon',
            name: existingHackathon.hackathonName,
          },
          content: `Your registration for ${existingHackathon.hackathonName} has been confirmed!`,
          title: 'Registration Confirmed for Hackathon',
          additionalData: {
            hackathonName: existingHackathon.hackathonName,
            hackathonTime: `${existingHackathon.submissions.start} - ${existingHackathon.submissions.deadline}`,
            hackathonLocation: existingHackathon.location,
            linkDetails: `/Hackathon-detail/${hackathonId}/overview`,
          },
        });

        if (existingUser.notifications)
          existingUser.notifications.push(noti._id);
        else existingUser.notifications = [noti._id];
        existingUser.projects.push(...team.projects);
        await existingUser.save();
        if (existingUser.isUserSystem) {
          await sendEmail(
            existingUser.email,
            templateConfirmRegisterHTML(
              `${urlFe}/Hackathon-detail/${hackathonId}/overview`,
              existingUser.fullname,
              existingHackathon.hackathonName,
              `${existingHackathon.submissions.start} - ${existingHackathon.submissions.deadline}`,
              existingHackathon.location,
              existingHackathon.hackathonTypes.join(','),
            ),
            'Confirmation register Hackathon',
            'Send mail successfull',
          );
        }

        if (existingHackathon.hackathonIntegrateId && userId) {
          await this.interactionModel.create({
            user_id: new Types.ObjectId(userId),
            hackathon: existingHackathon._id,
            hackathon_id: existingHackathon.hackathonIntegrateId,
            status: TEAM_STATUS.HAD_TEAM,
            interaction_type: 'join',
          });
        }

        return {
          projectId,
          teamStatus: TEAM_STATUS.HAD_TEAM,
          hackathonId,
        };
      } else {
        const texist = await this.teamModel.find({
          hackathonId: hackathonId,
          members: { $in: [userId] },
          status: 'active',
        });
        if (texist?.length !== 0)
          throw new BadRequestException(
            'This user has join a team in this Hackathon',
          );

        await this.projectModel
          .deleteMany({
            createdBy: new Types.ObjectId(userId),
            registeredToHackathon: new Types.ObjectId(hackathonId),
          })
          .exec();

        await this.projectModel.updateMany(
          { _id: { $in: team.projects } },
          { $addToSet: { createdBy: existingUser._id } },
        );

        await this.hackathonModel.updateOne(
          { _id: hackathonId, 'registerUsers.userId': userId },
          { $set: { 'registerUsers.$.status': TEAM_STATUS.HAD_TEAM } },
        );
        team.members.push(new Types.ObjectId(userId));
        await team.save();
        existingUser.projects.push(...team.projects);
        if (existingHackathon.hackathonIntegrateId && userId) {
          await this.interactionModel.findOneAndUpdate(
            {
              user_id: userId,
              hackathon: hackathonId,
              interaction_type: 'join',
            },
            {
              $set: {
                status: TEAM_STATUS.HAD_TEAM, // Trạng thái mới
              },
            },
          );
        }
        const noti = await this.notificationModel.create({
          type: 'participation_confirmation',
          sender: {
            id: existingHackathon._id,
            avatar: existingHackathon.thumbnail,
            type: 'hackathon',
            name: existingHackathon.hackathonName,
          },
          content: `Your registration for join a team in ${existingHackathon.hackathonName} has been confirmed!`,
          title: 'Join a team Hackathon',
          additionalData: {
            hackathonName: existingHackathon.hackathonName,
            hackathonTime: `${existingHackathon.submissions.start} - ${existingHackathon.submissions.deadline}`,
            hackathonLocation: existingHackathon.location,
            linkDetails: `/Hackathon-detail/${hackathonId}/overview`,
          },
        });

        if (existingUser.notifications)
          existingUser.notifications.push(noti._id);
        else existingUser.notifications = [noti._id];
        await existingUser.save();
        await existingHackathon.save();

        return {
          projectId,
          teamStatus: TEAM_STATUS.HAD_TEAM,
          hackathonId,
        };
      }
    } else if (projectId) {
      if (user._props.email !== email)
        throw new BadRequestException('Not found user');
      const existingUser = await this.userModel.findOne({ email });
      if (!existingUser) throw new BadRequestException('Not found user');

      const existingHackathon = await this.hackathonModel.findById(hackathonId);
      if (!existingHackathon)
        throw new BadRequestException('Not found hackathon');
      const userId = existingUser._id.toString();

      const project = await this.projectModel.findById(projectId);
      if (!project) throw new BadRequestException('Not found project');

      // check number of team
      const currentNum = project.createdBy.length;
      let isOk = true;
      const teamRequirement = existingHackathon.teamRequirement;
      if (teamRequirement) {
        if (currentNum >= teamRequirement.max && teamRequirement.isRequire) {
          isOk = false;
        }
      }
      if (!isOk)
        throw new ConflictException(
          'This team is full. Please ask another team to join. ',
        );
      /**
       * check status
       * isRegister to this Hackathon
       * => Yes  => check status
       *        status = solo | find_teamate => Add to project, hackathon => Delete old project if has
       * => No => Add to project, hackathon
       */
      const registerToHackathon = existingHackathon.registerUsers.find(
        (user) => user.userId.toString() === userId,
      );

      if (!registerToHackathon) {
        existingUser.registerHackathons.push(existingHackathon._id);
        existingHackathon.registerUsers.push({
          userId: existingUser._id,
          status: TEAM_STATUS.HAD_TEAM,
        });
        await this.projectModel.updateOne(
          { _id: projectId },
          { $addToSet: { createdBy: existingUser._id } },
        );
        existingUser.projects.push(project._id);

        await existingHackathon.save();
        const noti = await this.notificationModel.create({
          type: 'participation_confirmation',
          sender: {
            id: existingHackathon._id,
            avatar: existingHackathon.thumbnail,
            type: 'hackathon',
            name: existingHackathon.hackathonName,
          },
          content: `Your registration for ${existingHackathon.hackathonName} has been confirmed!`,
          title: 'Registration Confirmed for Hackathon',
          additionalData: {
            hackathonName: existingHackathon.hackathonName,
            hackathonTime: `${existingHackathon.submissions.start} - ${existingHackathon.submissions.deadline}`,
            hackathonLocation: existingHackathon.location,
            linkDetails: `/Hackathon-detail/${hackathonId}/overview`,
          },
        });

        if (existingUser.notifications)
          existingUser.notifications.push(noti._id);
        else existingUser.notifications = [noti._id];
        await existingUser.save();
        if (existingUser.isUserSystem) {
          await sendEmail(
            existingUser.email,
            templateConfirmRegisterHTML(
              `${urlFe}/Hackathon-detail/${hackathonId}/overview`,
              existingUser.fullname,
              existingHackathon.hackathonName,
              `${existingHackathon.submissions.start} - ${existingHackathon.submissions.deadline}`,
              existingHackathon.location,
              existingHackathon.hackathonTypes.join(','),
            ),
            'Confirmation register Hackathon',
            'Send mail successfull',
          );
        }

        if (existingHackathon.hackathonIntegrateId && userId) {
          await this.interactionModel.create({
            user_id: new Types.ObjectId(userId),
            hackathon: existingHackathon._id,
            hackathon_id: existingHackathon.hackathonIntegrateId,
            status: TEAM_STATUS.HAD_TEAM,
            interaction_type: 'join',
          });
        }

        return {
          projectId,
          teamStatus: TEAM_STATUS.HAD_TEAM,
          hackathonId,
        };
      } else {
        if (registerToHackathon.status === TEAM_STATUS.HAD_TEAM)
          throw new BadRequestException(
            'This user has join a team in this Hackathon',
          );

        await this.projectModel
          .deleteMany({
            createdBy: new Types.ObjectId(userId),
            registeredToHackathon: new Types.ObjectId(hackathonId),
          })
          .exec();

        await this.projectModel.updateOne(
          { _id: projectId },
          { $addToSet: { createdBy: existingUser._id } },
        );
        await this.hackathonModel.updateOne(
          { _id: hackathonId, 'registerUsers.userId': userId },
          { $set: { 'registerUsers.$.status': TEAM_STATUS.HAD_TEAM } },
        );
        existingUser.projects.push(project._id);

        if (existingHackathon.hackathonIntegrateId && userId) {
          await this.interactionModel.findOneAndUpdate(
            {
              user_id: userId,
              hackathon: hackathonId,
              interaction_type: 'join',
            },
            {
              $set: {
                status: TEAM_STATUS.HAD_TEAM, // Trạng thái mới
              },
            },
          );
        }
        await existingUser.save();
        await existingHackathon.save();

        return {
          projectId,
          teamStatus: TEAM_STATUS.HAD_TEAM,
          hackathonId,
        };
      }
    }
  }
  @Post(':projectId/toggle-like')
  async toggleLike(
    @Param('projectId') projectId: string,
    @Body('userId') userId: string,
  ) {
    const project = await this.projectModel.findById(projectId).populate([
      {
        path: 'registeredToHackathon',
        model: 'HackathonDocument',
        select: 'hackathonIntegrateId _id',
      },
    ]);

    if (!project) {
      throw new Error('Project not found');
    }

    // Kiểm tra user đã like chưa
    const hasLiked = project.likedBy.includes(userId);

    if (hasLiked) {
      // Nếu đã like, thì unlike
      project.likedBy = project.likedBy.filter((id) => id !== userId);
    } else {
      // Nếu chưa like, thì thêm vào likedBy
      project.likedBy.push(userId);
      if (project.registeredToHackathon && userId) {
        if (
          (project.registeredToHackathon as any).hackathonIntegrateId &&
          userId
        ) {
          await this.interactionModel.create({
            user_id: new Types.ObjectId(userId),
            hackathon: new Types.ObjectId(
              (project.registeredToHackathon as any)._id,
            ),
            hackathon_id: (project.registeredToHackathon as any)
              .hackathonIntegrateId,
            interaction_type: 'like',
          });
        }
      }
    }
    await project.save();
    return project;
  }

  @Post(':projectId/add-comment')
  async addComment(
    @Param('projectId') projectId: string,
    @Body()
    body: {
      user?: string;
      updateStr?: string;
      updateId?: string;
      comment?: { user: string; comment: string };
    },
  ) {
    const { comment, user, updateStr } = body;
    const project = await this.projectModel.findById(projectId).populate([
      {
        path: 'registeredToHackathon',
        model: 'HackathonDocument',
        select: 'hackathonIntegrateId _id',
      },
    ]);

    if (!project) {
      throw new Error('Project not found');
    }

    // Tìm bản cập nhật tương ứng

    if (!project.updates) {
      project.updates = [
        {
          id: uuidv4(),
          update: updateStr,
          user,
          createdAt: new Date().toISOString(),
          comments: comment
            ? [
                {
                  user: comment.user,
                  comment: comment.comment,
                  createdAt: new Date().toISOString(),
                },
              ]
            : [],
        },
      ];
    } else {
      // Thêm comment vào update
      if (project.updates[0].comments.length === 0) {
        project.updates[0].comments = [
          {
            user: comment.user,
            comment: comment.comment,
            createdAt: new Date().toISOString(),
          },
        ];
      } else {
        project.updates[0].comments.push({
          user: comment.user,
          comment: comment.comment,
          createdAt: new Date().toISOString(),
        });
      }
    }
    if (project.registeredToHackathon && user) {
      if ((project.registeredToHackathon as any).hackathonIntegrateId && user) {
        await this.interactionModel.create({
          user_id: new Types.ObjectId(user),
          hackathon: new Types.ObjectId(
            (project.registeredToHackathon as any)._id,
          ),
          hackathon_id: (project.registeredToHackathon as any)
            .hackathonIntegrateId,
          interaction_type: 'like',
        });
      }
    }

    await this.projectModel.findByIdAndUpdate(projectId, {
      updates: project.updates,
    });
    return project;
  }

  @Post(':projectId/remove-member')
  async removeMember(
    @Param('projectId') projectId: string,
    @Body() body: { hackathonId: string; ownerId: string; memberId: string },
  ) {
    const { ownerId, memberId, hackathonId } = body;
    const project = await this.projectModel.findOne({
      owner: ownerId,
      _id: new Types.ObjectId(projectId),
    });
    if (!project) throw new BadRequestException('Not found project');
    const hackathon = await this.hackathonModel.findById(hackathonId);
    if (!hackathon) throw new BadRequestException('Not found hackathon');

    const userMember = await this.userModel.findById(memberId);
    if (!userMember) throw new BadRequestException('Not found user');

    // remove projects user
    await this.userModel.findByIdAndUpdate(
      memberId,
      {
        $pull: { projects: new Types.ObjectId(projectId) },
      },
      { new: true },
    );

    // remove createBy in project
    await this.projectModel.findByIdAndUpdate(
      projectId,
      {
        $pull: { createdBy: new Types.ObjectId(memberId) },
      },
      { new: true },
    );

    // change status of registered user => looking for teamate
    await this.hackathonModel.updateOne(
      { _id: hackathonId, 'registerUsers.userId': memberId },
      { $set: { 'registerUsers.$.status': TEAM_STATUS.FINDING_TEAMATE } },
    );

    await this.interactionModel.findOneAndUpdate(
      {
        user_id: memberId,
        hackathon: hackathonId,
        interaction_type: 'join',
      },
      {
        $set: {
          status: TEAM_STATUS.FINDING_TEAMATE, // Trạng thái mới
        },
      },
    );
    return memberId;
  }
}

async function sendMailInviteUser(
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
