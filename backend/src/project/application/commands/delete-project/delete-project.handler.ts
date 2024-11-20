import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import {
  PROJECT_REPOSITORY,
  ProjectRepository,
} from 'src/Project/domain/repositories/Project.repository';
import { DeleteProjectCommand } from './delete-project.command';

@CommandHandler(DeleteProjectCommand)
export class DeleteProjectHandler
  implements ICommandHandler<DeleteProjectCommand>
{
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
  ) {}

  async execute(command: DeleteProjectCommand) {
    const { id } = command.props;

    const hackObj = await this.projectRepository.findById(id);

    if (!hackObj) {
      throw new NotFoundException(`Project with ID ${id} not found.`);
    }

    const message = await this.projectRepository.delete(id);

    return { data: message };
  }
}
