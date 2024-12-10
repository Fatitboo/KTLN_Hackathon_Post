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
import { GetProjectRegisteredHackathonQuery } from 'src/project/application/queries/get-projec-registered-hackathon/get-project-registered-hackathon.query';
import { FilterProjectsDto } from '../dto/search-filter-projects.dto';
import { SearchFilterHackathonsQuery } from 'src/hackathon/application/queries/search-filter-hackathons/search-filter-hackathons.query';
import { SearchFilterProjectsQuery } from 'src/project/application/queries/search-filter-project/search-filter-project.query';

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

  @Post('search')
  async search(@Body() filterDto: FilterProjectsDto) {
    return await this.queryBus.execute(
      new SearchFilterProjectsQuery(filterDto),
    );
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
}
