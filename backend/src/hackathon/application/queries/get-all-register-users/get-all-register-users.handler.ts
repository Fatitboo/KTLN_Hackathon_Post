import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAllRegisterUsersQuery } from './get-all-register-users.query';
import { HackathonRepository } from 'src/hackathon/domain/repositories/hackathon.repository';

@QueryHandler(GetAllRegisterUsersQuery)
export class GetAllRegisterUsersHandler
  implements IQueryHandler<GetAllRegisterUsersQuery>
{
  constructor(
    @Inject('HackathonRepository')
    private readonly hackathonRepository: HackathonRepository,
  ) {}

  async execute(query: GetAllRegisterUsersQuery): Promise<any> {
    return await this.hackathonRepository.findAllRegisterUser(query.props);
  }
}
