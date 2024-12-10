import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetProjectsQuery } from './get-projects.query';
import { HackathonRepository } from 'src/hackathon/domain/repositories/hackathon.repository';

@QueryHandler(GetProjectsQuery)
export class GetProjectsHandler implements IQueryHandler<GetProjectsQuery> {
  constructor(
    @Inject('HackathonRepository')
    private readonly hackathonRepository: HackathonRepository,
  ) {}

  async execute(query: GetProjectsQuery): Promise<any> {
    return await this.hackathonRepository.findAllProject(
      query.id,
      query.type,
      query.page,
    );
  }
}
