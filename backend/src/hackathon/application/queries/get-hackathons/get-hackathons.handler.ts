import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetHackathonsQuery } from './get-hackathons.query';
import { HackathonRepository } from 'src/hackathon/domain/repositories/hackathon.repository';

@QueryHandler(GetHackathonsQuery)
export class GetHackathonsHandler implements IQueryHandler<GetHackathonsQuery> {
  constructor(
    @Inject('HackathonRepository')
    private readonly hackathonRepository: HackathonRepository,
  ) {}

  async execute(query: GetHackathonsQuery): Promise<any> {
    return await this.hackathonRepository.findAll(query.userId, query.page);
  }
}
