import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetMembersProjectQuery } from './get-member-project.query';
import { ProjectRepository } from 'src/project/domain/repositories/project.repository';

@QueryHandler(GetMembersProjectQuery)
export class GetMembersProjectHandler
  implements IQueryHandler<GetMembersProjectQuery>
{
  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepository,
  ) {}

  async execute(query: GetMembersProjectQuery): Promise<any> {
    return await this.projectRepository.findMembersProject(query.projectId);
  }
}
