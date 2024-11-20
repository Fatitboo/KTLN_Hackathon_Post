import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetProjectQuery } from './get-project.query';
import { ProjectRepository } from 'src/project/domain/repositories/project.repository';

@QueryHandler(GetProjectQuery)
export class GetProjectHandler implements IQueryHandler<GetProjectQuery> {
  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepository,
  ) {}

  async execute(query: GetProjectQuery): Promise<any> {
    return await this.projectRepository.findById(query.id);
  }
}
