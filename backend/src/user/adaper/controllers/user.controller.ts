import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Res,
  UseGuards,
  Query,
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

@Controller('users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('/update-user/:id')
  // @UseGuards(JwtAuthGuard)
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return await this.commandBus.execute(
      new UpdateUserCommand({
        id,
        ...body,
      }),
    );
  }

  @Get('/get-user-profile/:id')
  // @UseGuards(JwtAuthGuard)
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
