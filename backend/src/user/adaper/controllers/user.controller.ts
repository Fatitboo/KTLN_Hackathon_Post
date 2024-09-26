import { Controller, Post, Body, Get, Param, Res } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from 'src/user/application/commands/create-user/create-user.command';
import { GetUserQuery } from 'src/user/application/queries/get-user/get-user.query';
import { createUserDto } from '../dto/create-user.dto';
import { User } from 'src/user/domain/entities/user.entity';
import { join } from 'path';
import { Response } from 'express';

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

  @Get('data.json')
  async uploadData(@Res() res: Response) {
    // const filePath = join(__dirname, '..', 'data', 'hacksthons.dataset.json'); // Update the path to your CSV file
    // console.log('🚀 ~ UserController ~ uploadData ~ filePath:', filePath);
    const fileName =
      '/Users/mac/WorkSpace/KTLN_Hackathon_Post/backend/dist/data/new.json';
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'application/json');
    res.sendFile(fileName, (err) => {
      if (err) {
        res.status(500).send('Error in sending file');
      }
    });
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.queryBus.execute(new GetUserQuery(id));
  }
}
