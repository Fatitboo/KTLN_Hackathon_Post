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

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: ProjectDocument.name, schema: ProjectSchema },
      { name: UserDocument.name, schema: UserSchema },
    ]),
  ],
  controllers: [ProjectController],
  providers: [
    { provide: PROJECT_REPOSITORY, useClass: MongooseProjectRepository },
    GetProjectHandler,
    GetProjectsHandler,
    CreateProjectHandler,
    UpdateProjectHandler,
    DeleteProjectHandler,
  ],
})
export class ProjectModule {}
