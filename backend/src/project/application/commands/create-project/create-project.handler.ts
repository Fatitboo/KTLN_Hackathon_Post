import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProjectCommand } from './create-project.command';
import { Inject } from '@nestjs/common';
import {
  PROJECT_REPOSITORY,
  ProjectRepository,
} from 'src/Project/domain/repositories/Project.repository';

@CommandHandler(CreateProjectCommand)
export class CreateProjectHandler
  implements ICommandHandler<CreateProjectCommand>
{
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
  ) {}

  async execute(command: CreateProjectCommand) {
    const { userId, title, hackathonId, teamType } = command.props;
    return {
      projectId: await this.projectRepository.create(
        userId,
        title,
        hackathonId,
        teamType,
      ),
    };
  }
}
