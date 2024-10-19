import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUserQuery } from 'src/user/application/queries/get-user/get-user.query';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/user/domain/common/guards/jwtAuth.guard';

@Controller('users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

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
  @UseGuards(JwtAuthGuard)
  async getUser(@Param('id') id: string) {
    return await this.queryBus.execute(new GetUserQuery(id));
  }
}
