import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Res,
  UseGuards,
  Query,
  Inject,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/user/domain/common/guards/jwtAuth.guard';
import { UpdateUserDto } from '../dto/update-user.dto';
import {
  GetUserBy,
  GetUserDetailQuery,
  GetUserType,
} from 'src/user/application/queries/get-user-detail/get-user-detail.query';
import { UpdateUserCommand } from 'src/user/application/commands/update-user/update-user.command';
import { RegisterToHackathonCommand } from 'src/user/application/commands/register-to-hackathon/register-to-hackathon.command';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/user/domain/repositories/user.repository';

@Controller('users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  @Post('/update-user/:id')
  @UseGuards(JwtAuthGuard)
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return await this.commandBus.execute(
      new UpdateUserCommand({
        id,
        ...body,
      }),
    );
  }

  @Post('/register-hackathon/:userId')
  // @UseGuards(JwtAuthGuard)
  async registerHackathon(
    @Param('userId') userId: string,
    @Body() body: { hackathonId: string; additionalInfo: any },
  ) {
    return await this.commandBus.execute(
      new RegisterToHackathonCommand({
        userId,
        hackathonId: body.hackathonId,
        additionalInfo: body.additionalInfo,
      }),
    );
  }
  @Get('/search')
  // @UseGuards(JwtAuthGuard)
  async searchUsers(
    @Query('hackathonId') hackathonId: string,
    @Query('searchTerm') searchTerm: string,
    @Query('searchQuery') searchQuery: string,
  ) {
    return await this.userRepository.searchUser(
      hackathonId,
      searchQuery,
      searchTerm,
    );
  }

  @Get('/get-user-profile/:id')
  @UseGuards(JwtAuthGuard)
  async getUser(
    @Param('id') id: string,
    @Query('getType') getType: GetUserType,
    @Query('getBy') getBy: GetUserBy,
  ) {
    return await this.queryBus.execute(
      new GetUserDetailQuery({
        getType,
        getBy,
        id,
        email: id,
      }),
    );
  }
}
