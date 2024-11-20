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
import { Project } from 'src/project/domain/entities/project.entity';
import { CreateProjectCommand } from 'src/project/application/commands/create-project/create-project.command';
import { GetProjectQuery } from 'src/project/application/queries/get-project/get-project.query';
import { UpdateProjectCommand } from 'src/project/application/commands/update-project/update-project.command';
import { DeleteProjectCommand } from 'src/project/application/commands/delete-project/delete-project.command';
import { GetProjectsQuery } from 'src/project/application/queries/get-projects/get-projects.query';
import { UpdateProjectDTO } from '../dto/update-project.dto';

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getAllProjects(@Query('page') page: number) {
    return await this.queryBus.execute(new GetProjectsQuery(page));
  }

  @Get(':id')
  async getProject(@Param('id') id: string) {
    return await this.queryBus.execute(new GetProjectQuery(id));
  }

  @Post(':userId')
  async createProject(
    @Param('userId') userId: string,
    @Body() body: { title: string },
  ): Promise<string> {
    const result = this.commandBus.execute(
      new CreateProjectCommand({ userId: userId, title: body.title }),
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
}
