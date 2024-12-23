import {
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
import { Model } from 'mongoose';
import { AwardHackathonCommand } from 'src/hackathon/application/commands/awarding-hackathon/awarding-hackathon.command';

@Controller('hackathons')
export class HackathonController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @InjectModel(HackathonDocument.name)
    private readonly hackathonModel: Model<HackathonDocument>,
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
    @Query('host') host: string,
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
        host,
        sort,
        page,
        limit,
      }),
    );
  }

  @Get(':id')
  async getHackathon(@Param('id') id: string) {
    return await this.queryBus.execute(new GetHackathonQuery(id));
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

  @Get('register-users/:id')
  async getAllRegisterUserHackathon(
    @Param('id') id: string,
    @Query('search') search: string,
    @Query('specialty') specialty: string,
    @Query('status') status: string,
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

  @Get('seed-data/hackathons')
  async seedDataHackathon(): Promise<string> {
    const result = this.commandBus.execute(new SeedDataHackathonCommand());
    return result;
  }
}
