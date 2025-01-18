import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetHackathonComponentQuery } from './get-hackathon-component.query';
import { HackathonRepository } from 'src/hackathon/domain/repositories/hackathon.repository';

@QueryHandler(GetHackathonComponentQuery)
export class GetHackathonComponentHandler
  implements IQueryHandler<GetHackathonComponentQuery>
{
  constructor(
    @Inject('HackathonRepository')
    private readonly hackathonRepository: HackathonRepository,
  ) {}

  async execute(query: GetHackathonComponentQuery): Promise<any> {
    return await this.hackathonRepository.getHackathonComponent(
      query.id,
      query.type,
    );
  }
}
