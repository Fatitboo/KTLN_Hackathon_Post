import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AwardHackathonCommand } from './awarding-hackathon.command';
import { Inject } from '@nestjs/common';
import {
  HACKATHON_REPOSITORY,
  HackathonRepository,
} from 'src/hackathon/domain/repositories/hackathon.repository';

@CommandHandler(AwardHackathonCommand)
export class AwardHackathonHandler
  implements ICommandHandler<AwardHackathonCommand>
{
  constructor(
    @Inject(HACKATHON_REPOSITORY)
    private readonly hackathonRepository: HackathonRepository,
  ) {}

  async execute(command: AwardHackathonCommand) {
    const { hackathonId, hackathon } = command.props;

    return {
      hackathonId: await this.hackathonRepository.award(hackathonId, hackathon),
    };
  }
}
