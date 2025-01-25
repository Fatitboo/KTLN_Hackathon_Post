import { Module } from '@nestjs/common';
import { ProjectController } from './adapter/controllers/project.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProjectDocument,
  ProjectSchema,
} from './infrastructure/database/schemas';
import { PROJECT_REPOSITORY } from './domain/repositories/project.repository';
import { MongooseProjectRepository } from './infrastructure/database/repositories/mongoose-project.repository';
import { CreateProjectHandler } from './application/commands/create-project/create-project.handler';
import { GetProjectHandler } from './application/queries/get-project/get-project.handler';
import {
  UserDocument,
  UserSchema,
} from 'src/user/infrastructure/database/schemas';
import { GetProjectsHandler } from './application/queries/get-projects/get-projects.handler';
import { UpdateProjectHandler } from './application/commands/update-project/update-project.handler';
import { DeleteProjectHandler } from './application/commands/delete-project/delete-project.handler';
import {
  HackathonDocument,
  HackathonSchema,
} from 'src/hackathon/infrastructure/database/schemas';
import { GetProjectRegisteredHackathonHandler } from './application/queries/get-projec-registered-hackathon/get-project-registered-hackathon.handler';
import { SearchFilterProjectsHandler } from './application/queries/search-filter-project/search-filter-project.handler';
import { UserModule } from 'src/user/user.module';
import {
  InteractionDocument,
  InterationSchema,
} from 'src/hackathon/infrastructure/database/schemas/interaction.schema';
import { GetMembersProjectHandler } from './application/queries/get-member-project/get-member-project.handler';
import {
  NotificationDocument,
  NotificationSchema,
} from 'src/hackathon/infrastructure/database/schemas/notification.schema';
import {
  TeamDocument,
  TeamSchema,
} from 'src/hackathon/infrastructure/database/schemas/team.schema';

@Module({
  imports: [
    CqrsModule,
    UserModule,
    MongooseModule.forFeature([
      { name: ProjectDocument.name, schema: ProjectSchema },
      { name: HackathonDocument.name, schema: HackathonSchema },
      { name: UserDocument.name, schema: UserSchema },
      { name: InteractionDocument.name, schema: InterationSchema },
      { name: NotificationDocument.name, schema: NotificationSchema },
      { name: TeamDocument.name, schema: TeamSchema },
    ]),
  ],
  controllers: [ProjectController],
  providers: [
    { provide: PROJECT_REPOSITORY, useClass: MongooseProjectRepository },
    GetProjectHandler,
    GetMembersProjectHandler,
    GetProjectsHandler,
    CreateProjectHandler,
    UpdateProjectHandler,
    DeleteProjectHandler,
    GetProjectRegisteredHackathonHandler,
    SearchFilterProjectsHandler,
  ],
})
export class ProjectModule {}
