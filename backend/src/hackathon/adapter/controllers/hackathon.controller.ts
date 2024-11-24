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

@Controller('hackathons')
export class HackathonController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getAllHackathons(@Query('page') page: number) {
    return await this.queryBus.execute(new GetHackathonsQuery(page));
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
    const result = this.commandBus.execute(
      new UpdateHackathonCommand({ id: id, hackathon: hackathon }),
    );

    return result;
  }

  @Get('register-users/:id')
  async getAllRegisterUserHackathon(
    @Param('id') id: string,
    @Query('page') page: number,
  ): Promise<any[]> {
    if (id == null) throw new Error('Id is empty');
    const result = this.queryBus.execute(
      new GetAllRegisterUsersQuery(id, page),
    );

    return result;
  }

  @Delete(':id')
  async deleteHackathon(@Param('id') id: string): Promise<string> {
    if (id == null) throw new Error('Id is empty');
    const result = this.commandBus.execute(
      new DeleteHackathonCommand({ id: id }),
    );

    return result;
  }
}
