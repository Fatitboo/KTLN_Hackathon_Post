import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetHackathonQuery } from './get-hackathon.query';
import { HackathonRepository } from 'src/hackathon/domain/repositories/hackathon.repository';

@QueryHandler(GetHackathonQuery)
export class GetHackathonHandler implements IQueryHandler<GetHackathonQuery> {
  constructor(
    @Inject('HackathonRepository')
    private readonly hackathonRepository: HackathonRepository,
  ) {}

  async execute(query: GetHackathonQuery): Promise<any> {
    return await this.hackathonRepository.findById(query.id, query.userId);
  }
}
