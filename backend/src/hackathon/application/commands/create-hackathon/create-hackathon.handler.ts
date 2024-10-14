import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateHackathonCommand } from './create-hackathon.command';
import { Inject } from '@nestjs/common';
import {
  HACKATHON_REPOSITORY,
  HackathonRepository,
} from 'src/hackathon/domain/repositories/hackathon.repository';
import { Hackathon } from 'src/hackathon/domain/entities/hackathon.entity';

@CommandHandler(CreateHackathonCommand)
export class CreateHackathonHandler
  implements ICommandHandler<CreateHackathonCommand>
{
  constructor(
    @Inject(HACKATHON_REPOSITORY)
    private readonly hackathonRepository: HackathonRepository,
  ) {}

  async execute(command: CreateHackathonCommand) {
    const { hackathonName } = command.props;
    const hackathon = new Hackathon(
      new Date().getTime().toString(),
      hackathonName,
    );
    return { data: await this.hackathonRepository.save(hackathon) };
  }
}
