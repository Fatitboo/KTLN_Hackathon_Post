import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import {
  PROJECT_REPOSITORY,
  ProjectRepository,
} from 'src/Project/domain/repositories/Project.repository';
import { UpdateProjectCommand } from './update-project.command';
import { Project } from 'src/Project/domain/entities/Project.entity';

@CommandHandler(UpdateProjectCommand)
export class UpdateProjectHandler
  implements ICommandHandler<UpdateProjectCommand>
{
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
  ) {}

  async execute(command: UpdateProjectCommand) {
    const { id, project } = command.props;

    // Tìm kiếm Project theo ID
    const existingProject = await this.projectRepository.findById(id);
    if (!existingProject) {
      throw new NotFoundException(`Project with ID ${id} not found.`);
    }

    // Cập nhật các thuộc tính mới từ command
    const updatedProject = new Project(
      id,
      `${project.projectTitle.trim().toLocaleLowerCase().replace(/ /g, '-')}`,
      project.projectTitle ?? existingProject.projectTitle,
      project.tagline ?? existingProject.tagline,
      project.content ?? existingProject.content,
      project.thumnailImage ?? existingProject.thumnailImage,
      project.builtWith ?? existingProject.builtWith,
      project.tryoutLinks ?? existingProject.tryoutLinks,
      project.likedBy ?? existingProject.likedBy,
      project.createdByUsername ?? existingProject.createdByUsername,
      project.galary ?? existingProject.galary,
      project.updates ?? existingProject.updates,
    );

    // Gọi repository để lưu lại cập nhật
    const result = await this.projectRepository.update(id, updatedProject);

    if (!result) {
      throw new NotFoundException(`Failed to update Project with ID ${id}.`);
    }

    return { data: result };
  }
}
