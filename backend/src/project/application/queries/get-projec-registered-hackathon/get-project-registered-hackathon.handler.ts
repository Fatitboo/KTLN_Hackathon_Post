import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetProjectRegisteredHackathonQuery } from './get-project-registered-hackathon.query';
import { ProjectRepository } from 'src/project/domain/repositories/project.repository';

@QueryHandler(GetProjectRegisteredHackathonQuery)
export class GetProjectRegisteredHackathonHandler
  implements IQueryHandler<GetProjectRegisteredHackathonQuery>
{
  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepository,
  ) {}

  async execute(query: GetProjectRegisteredHackathonQuery): Promise<any> {
    const { userId, hackathonId } = query.props;
    return this.projectRepository.findProjectRegisteredHackathon(
      userId,
      hackathonId,
    );
  }
}
