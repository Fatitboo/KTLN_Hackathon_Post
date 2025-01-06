import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Hackathon } from 'src/hackathon/domain/entities/hackathon.entity';
import { CreateHackathonCommand } from 'src/hackathon/application/commands/create-hackathon/create-hackathon.command';
import { UpdateHackathonDTO } from '../dto/update-hackathon.dto';
import { GetHackathonQuery } from 'src/hackathon/application/queries/get-hackathon/get-hackathon.query';
import { UpdateHackathonCommand } from 'src/hackathon/application/commands/update-hackathon/update-hackathon.command';
import { DeleteHackathonCommand } from 'src/hackathon/application/commands/delete-hackathon/delete-hackathon.command';
import { GetHackathonsQuery } from 'src/hackathon/application/queries/get-hackathons/get-hackathons.query';
import { GetAllRegisterUsersQuery } from 'src/hackathon/application/queries/get-all-register-users/get-all-register-users.query';
import { GetProjectsQuery } from 'src/hackathon/application/queries/get-projects-hackathon/get-projects.query';
import { SeedDataHackathonCommand } from 'src/hackathon/application/commands/seed-data-hackathon/seed-data-hackathon.command';
import { SearchFilterHackathonsQuery } from 'src/hackathon/application/queries/search-filter-hackathons/search-filter-hackathons.query';
import { InjectModel } from '@nestjs/mongoose';
import { HackathonDocument } from 'src/hackathon/infrastructure/database/schemas';
import { Model, Types } from 'mongoose';
import { AwardHackathonCommand } from 'src/hackathon/application/commands/awarding-hackathon/awarding-hackathon.command';
import { ReportDocument } from 'src/hackathon/infrastructure/database/schemas/report.schema';
import { UserDocument } from 'src/user/infrastructure/database/schemas';
import { v4 as uuidv4 } from 'uuid';

@Controller('hackathons')
export class HackathonController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @InjectModel(HackathonDocument.name)
    private readonly hackathonModel: Model<HackathonDocument>,
    @InjectModel(ReportDocument.name)
    private readonly reportModel: Model<ReportDocument>,
    @InjectModel(UserDocument.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  @Get()
  async getAllHackathons(@Query('page') page: number) {
    return await this.queryBus.execute(new GetHackathonsQuery(page));
  }

  @Get('/search')
  async searchFilterHackathons(
    @Query('search') search: string,
    @Query('location') location: string[],
    @Query('status') status: string[],
    @Query('length') length: string[],
    @Query('tags') tags: string[],
    @Query('hosts') hosts: string[],
    @Query('sort') sort: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return await this.queryBus.execute(
      new SearchFilterHackathonsQuery({
        search,
        location,
        status,
        length,
        tags,
        hosts,
        sort,
        page,
        limit,
      }),
    );
  }

  @Get(':id')
  async getHackathon(@Param('id') id: string, @Query('userId') userId: string) {
    return await this.queryBus.execute(new GetHackathonQuery(id, userId));
  }

  @Post(':userId')
  async createHackathon(@Param('userId') userId: string): Promise<string> {
    const result = this.commandBus.execute(
      new CreateHackathonCommand({ userId: userId }),
    );

    return result;
  }

  @Put(':id')
  async updateHackathon(
    @Param('id') id: string,
    @Body() hackathon: UpdateHackathonDTO,
  ): Promise<Hackathon> {
    if (id == null) throw new Error('Id is empty');
    console.log(hackathon);
    const result = this.commandBus.execute(
      new UpdateHackathonCommand({ id: id, hackathon: hackathon }),
    );

    return result;
  }

  @Post('awarding/:id')
  async awardingHackathon(
    @Param('id') id: string,
    @Body() hackathon: UpdateHackathonDTO,
  ): Promise<string> {
    console.log(id, hackathon);
    const result = this.commandBus.execute(
      new AwardHackathonCommand({ hackathonId: id, hackathon: hackathon }),
    );

    return result;
  }

  @Post('create-updates/:hackathonId')
  async createUpdates(
    @Param('hackathonId') hackathonId: string,
    @Body() body: { title: string; content: string },
  ) {
    const hackathon = await this.hackathonModel.findById(hackathonId);
    if (!hackathon) throw new BadRequestException('Not found hackathon');

    const upt = {
      createdAt: new Date().toISOString(),
      title: body.title,
      content: body.content,
      updateId: uuidv4(),
    };
    hackathon.updateNews.push(upt);
    hackathon.markModified('updateNews');

    await hackathon.save();
    return 'ok';
  }

  @Post('update-updates/:updateId')
  async updateUpdates(
    @Param('updateId') updateId: string,
    @Body() body: { hackathonId: string; title: string; content: string },
  ) {
    const hackathon = await this.hackathonModel.findById(body.hackathonId);
    if (!hackathon) throw new BadRequestException('Not found hackathon');
    const upts = hackathon.updateNews.map((u) => {
      if (u.updateId === updateId) {
        u.title = body.title;
        u.content = body.content;
      }
      return u;
    });

    hackathon.updateNews = upts;
    hackathon.markModified('updateNews');
    await hackathon.save();
    return 'ok';
  }

  @Post('delete-updates/:updateId')
  async deleteUpdates(
    @Param('updateId') updateId: string,
    @Body() body: { hackathonId: string; title: string; content: string },
  ) {
    const hackathon = await this.hackathonModel.findById(body.hackathonId);
    if (!hackathon) throw new BadRequestException('Not found hackathon');

    const upts = hackathon.updateNews.filter((d) => {
      if (d.updateId !== updateId) return true;
    });

    hackathon.updateNews = upts;
    hackathon.markModified('updateNews');
    await hackathon.save();
    return 'ok';
  }

  @Post('create-discussion/:hackathonId')
  async createDiscussion(
    @Param('hackathonId') hackathonId: string,
    @Body() body: { userId: string; title: string; content: string },
  ) {
    const user = await this.userModel.findById(body.userId);
    if (!user) throw new BadRequestException('Not found user');
    const hackathon = await this.hackathonModel.findById(hackathonId);
    if (!hackathon) throw new BadRequestException('Not found hackathon');
    const dcs = {
      userId: user._id,
      createdAt: new Date().toISOString(),
      title: body.title,
      content: body.content,
      discussionId: uuidv4(),
      userName:
        user._id === hackathon.user
          ? `[Manage hackathon: ${user.fullname}]`
          : user.fullname,
      avatar: user.avatar,
      comments: [],
    };
    if (hackathon.discussions) {
      hackathon.discussions.push(dcs);
    } else {
      hackathon.discussions = [dcs];
    }
    await hackathon.save();
    return hackathon._id;
  }

  @Post('update-discussion/:discussionId')
  async updateDiscussion(
    @Param('discussionId') discussionId: string,
    @Body() body: { hackathonId: string; title: string; content: string },
  ) {
    const hackathon = await this.hackathonModel.findById(body.hackathonId);
    if (!hackathon) throw new BadRequestException('Not found hackathon');
    const dsc = hackathon.discussions.map((d) => {
      if (d.discussionId === discussionId) {
        d.title = body.title;
        d.content = body.content;
      }
      return d;
    });
    hackathon.discussions = [...dsc];
    hackathon.markModified('discussions');
    await hackathon.save();
    return hackathon._id;
  }

  @Post('delete-discussion/:discussionId')
  async deleteDiscussion(
    @Param('discussionId') discussionId: string,
    @Body() body: { hackathonId: string },
  ) {
    const hackathon = await this.hackathonModel.findById(body.hackathonId);
    if (!hackathon) throw new BadRequestException('Not found hackathon');
    const dsc = hackathon.discussions.filter((d) => {
      if (d.discussionId !== discussionId) return true;
    });
    hackathon.discussions = dsc;
    await hackathon.save();
  }

  @Post('create-comment-discussion/:discussionId')
  async createCommentDiscussion(
    @Param('discussionId') discussionId: string,
    @Body()
    body: {
      userId: string;
      title: string;
      content: string;
      hackathonId: string;
    },
  ) {
    const user = await this.userModel.findById(body.userId);
    if (!user) throw new BadRequestException('Not found user');
    const hackathon = await this.hackathonModel.findById(body.hackathonId);
    if (!hackathon) throw new BadRequestException('Not found hackathon');
    const cmt = {
      userId: user._id,
      createdAt: new Date().toISOString(),
      title: body.title,
      content: body.content,
      commentId: uuidv4(),
      userName:
        user._id === hackathon.user
          ? `[Manage hackathon: ${user.fullname}]`
          : user.fullname,
      avatar: user.avatar,
    };
    const dsc = hackathon.discussions.map((d) => {
      if (d.discussionId === discussionId) {
        if (d.comments.length === 0) d.comments = [cmt];
        else d.comments.push(cmt);
      }
      return d;
    });
    hackathon.discussions = dsc;
    hackathon.markModified('discussions');
    await hackathon.save();
  }

  @Post('update-comment-discussion/:discussionId')
  async updateCommentDiscussion(
    @Param('discussionId') discussionId: string,
    @Body()
    body: {
      hackathonId: string;
      title: string;
      content: string;
      commentId: string;
    },
  ) {
    const hackathon = await this.hackathonModel.findById(body.hackathonId);
    if (!hackathon) throw new BadRequestException('Not found hackathon');
    const dsc = hackathon.discussions.map((d) => {
      if (d.discussionId === discussionId) {
        const cmts = d.comments.map((c) => {
          if (c.commentId === body.commentId) {
            c.title = body.title;
            c.content = body.content;
          }
          return c;
        });
        d.comments = cmts;
      }
      return d;
    });
    hackathon.discussions = dsc;
    hackathon.markModified('discussions');
    await hackathon.save();
  }

  @Post('create-report/:id')
  async createReportHackathon(
    @Param('id') hackathonId: string,
    @Body() body: { userId: string; content: string; type: string },
  ) {
    const user = await this.userModel.findById(body.userId);
    if (!user) throw new BadRequestException('Not found user');
    const hackathon = await this.hackathonModel.findById(hackathonId);
    if (!hackathon) throw new BadRequestException('Not found hackathon');
    const report = new this.reportModel({
      user: user._id,
      hackathon: hackathon._id,
      content: body.content,
      type: body.type,
    });
    const r = await report.save();
    if (!hackathon.reports) hackathon.reports = [r._id];
    else hackathon.reports.push(r._id);
    await hackathon.save();
    return r._id;
  }

  @Post('update-report/:id')
  async updateReportHackathon(
    @Param('id') reportId: string,
    @Body() body: { content: string; type: string },
  ) {
    const report = await this.reportModel.findById(reportId);
    if (!report) throw new BadRequestException('Not found report');
    report.content = body.content;
    report.type = body.type;
    await report.save();
    return 'ok';
  }

  @Post('delete-report/:id')
  async deleteReportHackathon(@Param('id') reportId: string) {
    const report = await this.reportModel.findById(reportId);
    if (!report) throw new BadRequestException('Not found report');
    await this.hackathonModel.findByIdAndUpdate(report.hackathon, {
      $pull: { reports: report._id },
    });
    await this.reportModel.findByIdAndDelete(reportId);
    return 'ok';
  }

  @Get('get-reports/:userId')
  async getReportOfUser(@Param('userId') userId: string) {
    if (userId === 'all') {
      const hackathons = await this.hackathonModel
        .find({ reports: { $exists: true, $ne: [] } })
        .populate('reports');

      return hackathons;
    } else {
      const user = await this.userModel.findById(userId);
      if (!user) throw new BadRequestException('Not found user');
      const rpids = (
        await this.reportModel.find({ user: user._id }).select('_id')
      ).map((item) => item._id);
      const hackathons = await this.hackathonModel
        .find({ reports: { $in: rpids } })
        .populate('reports');

      return hackathons;
    }
  }

  @Post('get-reports-of-hackathon/:hackathonId')
  async getReportHackathon(
    @Param('hackathonId') hackathonId: string,
    @Body() body: { userId?: string },
  ) {
    const hackathon = await this.hackathonModel.findById(hackathonId);
    if (!hackathon) throw new BadRequestException('Not found hackathon');
    if (body?.userId) {
      return await this.reportModel
        .find({
          hackathon: hackathon._id,
          user: new Types.ObjectId(body?.userId),
        })
        .populate({
          path: 'user',
          model: 'UserDocument',
        });
    }

    return await this.reportModel.find({ hackathon: hackathon._id }).populate({
      path: 'user',
      model: 'UserDocument',
    });
  }

  @Get('register-users/:id')
  async getAllRegisterUserHackathon(
    @Param('id') id: string,
    @Query('search') search: string,
    @Query('specialty') specialty: string[],
    @Query('status') status: string[],
    @Query('skills') skills: string[],
    @Query('interestedIn') interestedIn: string[],
    @Query('sort') sort: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<any[]> {
    if (id == null) throw new Error('Id is empty');
    const result = this.queryBus.execute(
      new GetAllRegisterUsersQuery({
        id,
        search,
        specialty,
        status,
        skills,
        interestedIn,
        sort,
        page,
        limit,
      }),
    );

    return result;
  }

  @Post('search/by-ids')
  async getHackathonsByIds(@Body() body: { hackathonLeans: any[] }) {
    let recommendHackathons = [];

    if (body.hackathonLeans.length === 0) {
      recommendHackathons = await this.hackathonModel
        .find()
        .sort({ registerUsers: -1 })
        .limit(10)
        .exec();
    } else {
      recommendHackathons = await this.hackathonModel
        .find({
          hackathonIntegrateId: {
            $in: body.hackathonLeans.map((item) => item.hackathon_id),
          },
        })
        .sort({ registerUsers: -1 })
        .limit(10)
        .exec();
    }
    const onlines = await this.hackathonModel
      .find({
        location: {
          $in: ['Online'],
        },
      })
      .sort({ registerUsers: -1 })
      .limit(4)
      .exec();
    const inPerson = await this.hackathonModel
      .find({
        location: {
          $nin: ['Online'],
        },
      })
      .sort({ registerUsers: -1 })
      .limit(4)
      .exec();

    return {
      recommendHackathons,
      onlines,
      inPerson,
    };
  }

  @Get('/:id/:type')
  async getAllProjectHackathon(
    @Param('id') id: string,
    @Param('type') type: string,
    @Query('page') page: number,
  ): Promise<any[]> {
    if (id == null) throw new Error('Id is empty');
    const result = this.queryBus.execute(new GetProjectsQuery(id, type, page));

    return result;
  }

  @Delete(':userId/delete/:id')
  async deleteHackathon(
    @Param('userId') userId: string,
    @Param('id') id: string,
  ): Promise<string> {
    if (id == null) throw new Error('Id is empty');
    const result = this.commandBus.execute(
      new DeleteHackathonCommand({ userId: userId, id: id }),
    );

    return result;
  }

  @Get('seed/seed-data/:type')
  async seedDataHackathon(@Param('type') type: string): Promise<string> {
    const result = this.commandBus.execute(
      new SeedDataHackathonCommand({ type }),
    );
    return result;
  }
}
