import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import {
  HACKATHON_REPOSITORY,
  HackathonRepository,
} from 'src/hackathon/domain/repositories/hackathon.repository';
import { UpdateHackathonCommand } from './update-hackathon.command';
import { Hackathon } from 'src/hackathon/domain/entities/hackathon.entity';

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

    // Tìm kiếm hackathon theo ID
    const existingHackathon = await this.hackathonRepository.findById(id);
    if (!existingHackathon) {
      throw new NotFoundException(`Hackathon with ID ${id} not found.`);
    }

    // Cập nhật các thuộc tính mới từ command
    // Cập nhật các thuộc tính mới từ command
    const updatedHackathon = new Hackathon(
      id,
      hackathon.hackathonName ?? existingHackathon.hackathonName,
      hackathon.tagline ?? existingHackathon.tagline,
      hackathon.managerMail ?? existingHackathon.managerMail,
      hackathon.hostName ?? existingHackathon.hostName,
      hackathon.hackathonTypes ?? existingHackathon.hackathonTypes,
      hackathon.applyFor ?? existingHackathon.applyFor,
      hackathon.isPublished ?? existingHackathon.isPublished,
      hackathon.participantAge ?? existingHackathon.participantAge,
      hackathon.teamRequirement ?? existingHackathon.teamRequirement,
      hackathon.thumbnail ?? existingHackathon.thumbnail,
      hackathon.headerTitleImage ?? existingHackathon.headerTitleImage,
      hackathon.mainDescription ?? existingHackathon.mainDescription,
      hackathon.videoDescription ?? existingHackathon.videoDescription,
      hackathon.submissionDescription ??
        existingHackathon.submissionDescription,
      hackathon.ruleDescription ?? existingHackathon.ruleDescription,
      hackathon.resourceDescription ?? existingHackathon.resourceDescription,
      hackathon.communityChatLink ?? existingHackathon.communityChatLink,
      hackathon.tasks ?? existingHackathon.tasks,
      hackathon.subjectMailTitle ?? existingHackathon.subjectMailTitle,
      hackathon.contentMailRegister ?? existingHackathon.contentMailRegister,
      hackathon.submissions ?? existingHackathon.submissions,
    );

    // Gọi repository để lưu lại cập nhật
    const result = await this.hackathonRepository.update(id, updatedHackathon);

    if (!result) {
      throw new NotFoundException(`Failed to update Hackathon with ID ${id}.`);
    }

    return { data: result };
  }
}
