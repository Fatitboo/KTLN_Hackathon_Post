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
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Project } from 'src/project/domain/entities/project.entity';
import { CreateProjectCommand } from 'src/project/application/commands/create-project/create-project.command';
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
import { da } from '@faker-js/faker/.';
import { JwtAuthGuard } from 'src/user/domain/common/guards/jwtAuth.guard';
import { GetMembersProjectQuery } from 'src/project/application/queries/get-member-project/get-member-project.query';

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
  async searchTags(@Body() body: { type: string }) {
    console.log('🚀 ~ ProjectController ~ searchTags ~ type:', body.type);
    let result;
    if (body.type === 'hackathon') {
      result = await this.hackathonModel.aggregate([
        { $unwind: '$hackathonTypes' },
        { $group: { _id: '$hackathonTypes' } },
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
    @Body() body: { title: string; hackathonId?: string; teamType?: string },
  ): Promise<string> {
    const result = this.commandBus.execute(
      new CreateProjectCommand({
        userId: userId,
        title: body.title,
        hackathonId: body.hackathonId,
        teamType: body.teamType,
      }),
    );

    return result;
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
        select: 'fullname email settingRecommend _id',
      },
    ]);
    if (!project) throw new BadRequestException();
    const { emails } = body;

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
      emails.map((email) => {
        const paramsToken = {
          email,
          hackathonId,
          projectId,
        };
        const token = this.auth2Service.generateTokenInvite(paramsToken);
        const link = `http://localhost:5173/Hackathon-detail/${hackathonId}/auto-register?token=${token}&email=${encodeURIComponent(email)}`;

        sendMailInviteUser(
          hackathonId,
          senderName,
          senderEmail,
          '',
          email,
          link,
          objHackathon,
        );
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
          const registerToHackathon = existingHackathon.registerUsers.find(
            (u) => u.userId.toString() === user._id.toString(),
          );
          if (
            registerToHackathon &&
            registerToHackathon.status === TEAM_STATUS.HAD_TEAM
          ) {
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
    @Body() body: {},
  ) {
    const payload = this.auth2Service.extractPayload(token);
    const { email, hackathonId, projectId } = payload as any;
    const { user } = request;

    if (user._props.email !== email)
      throw new BadRequestException('Not found user');
    const existingUser = await this.userModel.findOne({ email });
    if (!existingUser) throw new BadRequestException('Not found user');
    const project = await this.projectModel.findById(projectId);
    if (!project) throw new BadRequestException('Not found project');
    const existingHackathon = await this.hackathonModel.findById(hackathonId);
    if (!existingHackathon)
      throw new BadRequestException('Not found hackathon');
    const userId = existingUser._id.toString();

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

      await existingUser.save();
      await existingHackathon.save();

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
      await existingUser.save();
      await existingHackathon.save();

      return {
        projectId,
        teamStatus: TEAM_STATUS.HAD_TEAM,
        hackathonId,
      };
    }
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
      `http://localhost:5173/Hackathon-detail/${hackathonId}/overview`,
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
