import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateHackathonCommand } from './create-hackathon.command';
import { Inject } from '@nestjs/common';
import {
  HACKATHON_REPOSITORY,
  HackathonRepository,
} from 'src/hackathon/domain/repositories/hackathon.repository';

@CommandHandler(CreateHackathonCommand)
export class CreateHackathonHandler
  implements ICommandHandler<CreateHackathonCommand>
{
  constructor(
    @Inject(HACKATHON_REPOSITORY)
    private readonly hackathonRepository: HackathonRepository,
  ) {}

  async execute(command: CreateHackathonCommand) {
    const { userId } = command.props;
    return { hackathonId: await this.hackathonRepository.create(userId) };
  }
}
