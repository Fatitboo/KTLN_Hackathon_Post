import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetProjectsQuery } from './get-projects.query';
import { ProjectRepository } from 'src/Project/domain/repositories/Project.repository';

@QueryHandler(GetProjectsQuery)
export class GetProjectsHandler implements IQueryHandler<GetProjectsQuery> {
  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepository,
  ) {}

  async execute(query: GetProjectsQuery): Promise<any> {
    return await this.projectRepository.findAll(query.page);
  }
}
