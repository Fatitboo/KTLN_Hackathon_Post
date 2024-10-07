import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import {
  HACKATHON_REPOSITORY,
  HackathonRepository,
} from 'src/hackathon/domain/repositories/hackathon.repository';
import { UpdateHackathonCommand } from './update-hackathon.command';

@CommandHandler(UpdateHackathonCommand)
export class UpdateHackathonHandler
  implements ICommandHandler<UpdateHackathonCommand>
{
  constructor(
    @Inject(HACKATHON_REPOSITORY)
    private readonly hackathonRepository: HackathonRepository,
  ) {}

  async execute(command: UpdateHackathonCommand) {
    const { id, hackathon } = command.props;

    const hackObj = await this.hackathonRepository.findById(id);

    if (!hackObj) {
      throw new NotFoundException(`Hackathon with ID ${id} not found.`);
    }

    hackObj.hackathonName = hackathon.hackathonName || hackObj.hackathonName;

    const updatedHackathon = await this.hackathonRepository.update(hackObj);

    return { data: updatedHackathon };
  }
}
