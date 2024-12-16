import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import {
  HACKATHON_REPOSITORY,
  HackathonRepository,
} from 'src/hackathon/domain/repositories/hackathon.repository';
import { DeleteHackathonCommand } from './delete-hackathon.command';

@CommandHandler(DeleteHackathonCommand)
export class DeleteHackathonHandler
  implements ICommandHandler<DeleteHackathonCommand>
{
  constructor(
    @Inject(HACKATHON_REPOSITORY)
    private readonly hackathonRepository: HackathonRepository,
  ) {}

  async execute(command: DeleteHackathonCommand) {
    const { id, userId } = command.props;

    const hackObj = await this.hackathonRepository.findById(id);

    if (!hackObj) {
      throw new NotFoundException(`Hackathon with ID ${id} not found.`);
    }

    const message = await this.hackathonRepository.delete(userId, id);

    return { data: message };
  }
}
