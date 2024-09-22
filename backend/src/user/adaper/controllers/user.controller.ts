import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from 'src/user/application/commands/create-user/create-user.command';
import { GetUserQuery } from 'src/user/application/queries/get-user/get-user.query';
import { createUserDto } from '../dto/create-user.dto';
import { User } from 'src/user/domain/entities/user.entity';
@Controller('users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createUser(@Body() body: createUserDto): Promise<User> {
    const { username, password } = body;
    const result = await this.commandBus.execute(
      new CreateUserCommand({ username, password }),
    );
    return result.data;
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.queryBus.execute(new GetUserQuery(id));
  }
}
