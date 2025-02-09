import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import {
  HACKATHON_REPOSITORY,
  HackathonRepository,
} from 'src/hackathon/domain/repositories/hackathon.repository';
import { UpdateHackathonCommand } from './update-hackathon.command';
import { Types } from 'mongoose';

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
    const updatedHackathon = {
      id: id,
      hackathonName: hackathon.hackathonName ?? existingHackathon.hackathonName,
      tagline: hackathon.tagline ?? existingHackathon.tagline,
      managerMail: hackathon.managerMail ?? existingHackathon.managerMail,
      hostName: hackathon.hostName ?? existingHackathon.hostName,
      hackathonTypes:
        hackathon.hackathonTypes ?? existingHackathon.hackathonTypes,
      applyFor: hackathon.applyFor ?? existingHackathon.applyFor,
      isPublished: hackathon.isPublished ?? existingHackathon.isPublished,
      participantAge:
        hackathon.participantAge ?? existingHackathon.participantAge,
      teamRequirement:
        hackathon.teamRequirement ?? existingHackathon.teamRequirement,
      thumbnail: hackathon.thumbnail ?? existingHackathon.thumbnail,
      headerTitleImage:
        hackathon.headerTitleImage ?? existingHackathon.headerTitleImage,
      mainDescription:
        hackathon.mainDescription ?? existingHackathon.mainDescription,
      videoDescription:
        hackathon.videoDescription ?? existingHackathon.videoDescription,
      submissionDescription:
        hackathon.submissionDescription ??
        existingHackathon.submissionDescription,
      ruleDescription:
        hackathon.ruleDescription ?? existingHackathon.ruleDescription,
      resourceDescription:
        hackathon.resourceDescription ?? existingHackathon.resourceDescription,
      communityChatLink:
        hackathon.communityChatLink ?? existingHackathon.communityChatLink,
      tasks: hackathon.tasks ?? existingHackathon.tasks,
      subjectMailTitle:
        hackathon.subjectMailTitle ?? existingHackathon.subjectMailTitle,
      contentMailRegister:
        hackathon.contentMailRegister ?? existingHackathon.contentMailRegister,
      submissions: hackathon.submissions
        ? {
            start: new Date(hackathon.submissions.start),
            deadline: new Date(hackathon.submissions.deadline),
            note: hackathon.submissions.note,
            isUploadFile: hackathon.submissions.isUploadFile,
            isUploadVideo: hackathon.submissions.isUploadVideo,
          }
        : existingHackathon.submissions,
      judgingType: hackathon.judgingType ?? existingHackathon.judgingType,
      judgingPeriod: hackathon.judgingPeriod
        ? {
            start: new Date(hackathon.judgingPeriod.start),
            end: new Date(hackathon.judgingPeriod.start),
          }
        : existingHackathon.judgingPeriod,
      judges:
        hackathon.judges.map((item) => {
          if (item.userId)
            return { ...item, userId: new Types.ObjectId(item.userId) };
          else return { ...item };
        }) ?? existingHackathon.judges,
      criteria: hackathon.criteria ?? existingHackathon.criteria,
      criteriaScore: hackathon.criteriaScore ?? existingHackathon.criteriaScore,
      winnersAnnounced: hackathon.winnersAnnounced
        ? new Date(hackathon.winnersAnnounced)
        : existingHackathon.winnersAnnounced,
      prizeCurrency: hackathon.prizeCurrency ?? existingHackathon.prizeCurrency,
      prizes: hackathon.prizes ?? existingHackathon.prizes,
      block: hackathon.block ?? existingHackathon.block,
      location: hackathon.location ?? existingHackathon.location,
    };

    // Gọi repository để lưu lại cập nhật
    const result = await this.hackathonRepository.update(id, updatedHackathon);

    if (!result) {
      throw new NotFoundException(`Failed to update Hackathon with ID ${id}.`);
    }

    return { data: result };
  }
}
