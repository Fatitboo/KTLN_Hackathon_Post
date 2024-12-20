import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetProjectRegisteredHackathonQuery } from './get-project-registered-hackathon.query';
import { ProjectRepository } from 'src/project/domain/repositories/project.repository';
import { ProjectDocument } from 'src/project/infrastructure/database/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@QueryHandler(GetProjectRegisteredHackathonQuery)
export class GetProjectRegisteredHackathonHandler
  implements IQueryHandler<GetProjectRegisteredHackathonQuery>
{
  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepository,
    @InjectModel(ProjectDocument.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  async execute(query: GetProjectRegisteredHackathonQuery): Promise<any> {
    const { userId, hackathonId } = query.props;
    return this.projectRepository.findProjectRegisteredHackathon(
      userId,
      hackathonId,
    );
  }
}
