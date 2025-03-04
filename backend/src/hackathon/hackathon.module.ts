import { Module } from '@nestjs/common';
import { HackathonController } from './adapter/controllers/hackathon.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import {
  HackathonDocument,
  HackathonSchema,
} from './infrastructure/database/schemas';
import { HACKATHON_REPOSITORY } from './domain/repositories/hackathon.repository';
import { MongooseHackathonRepository } from './infrastructure/database/repositories/mongoose-hackathon.repository';
import { CreateHackathonHandler } from './application/commands/create-hackathon/create-hackathon.handler';
import { GetHackathonHandler } from './application/queries/get-hackathon/get-hackathon.handler';
import { UpdateHackathonHandler } from './application/commands/update-hackathon/update-hackathon.handler';
import { DeleteHackathonHandler } from './application/commands/delete-hackathon/delete-hackathon.handler';
import {
  UserDocument,
  UserSchema,
} from 'src/user/infrastructure/database/schemas';
import { GetHackathonsHandler } from './application/queries/get-hackathons/get-hackathons.handler';
import { GetAllRegisterUsersHandler } from './application/queries/get-all-register-users/get-all-register-users.handler';
import { SeedDataHackathonHandler } from './application/commands/seed-data-hackathon/seed-data-hackathon.handler';
import { SearchFilterHackathonsHandler } from './application/queries/search-filter-hackathons/search-filter-hackathons.handler';
import { GetProjectsHandler } from './application/queries/get-projects-hackathon/get-projects.handler';
import {
  ProjectDocument,
  ProjectSchema,
} from 'src/project/infrastructure/database/schemas';
import {
  InteractionDocument,
  InterationSchema,
} from './infrastructure/database/schemas/interaction.schema';
import { AwardHackathonHandler } from './application/commands/awarding-hackathon/awarding-hackathon.handler';
import {
  ReportDocument,
  ReportSchema,
} from './infrastructure/database/schemas/report.schema';
import { GetHackathonComponentHandler } from './application/queries/get-hackathon-component/get-hackathon-component.handler';
import { ChatDocument, ChatSchema } from 'src/chat/schema/chat.schema';
import { ChatModule } from 'src/chat/chat.module';
import {
  NotificationDocument,
  NotificationSchema,
} from './infrastructure/database/schemas/notification.schema';
import { TeamController } from './adapter/controllers/team.controller';
import {
  TeamDocument,
  TeamSchema,
} from './infrastructure/database/schemas/team.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    ChatModule,
    CqrsModule,
    UserModule,
    MongooseModule.forFeature([
      { name: HackathonDocument.name, schema: HackathonSchema },
      { name: UserDocument.name, schema: UserSchema },
      { name: ProjectDocument.name, schema: ProjectSchema },
      { name: InteractionDocument.name, schema: InterationSchema },
      { name: ReportDocument.name, schema: ReportSchema },
      { name: ChatDocument.name, schema: ChatSchema },
      { name: NotificationDocument.name, schema: NotificationSchema },
      { name: TeamDocument.name, schema: TeamSchema },
    ]),
  ],
  controllers: [HackathonController, TeamController],
  providers: [
    { provide: HACKATHON_REPOSITORY, useClass: MongooseHackathonRepository },
    GetHackathonHandler,
    GetHackathonsHandler,
    GetHackathonComponentHandler,
    GetProjectsHandler,
    GetAllRegisterUsersHandler,
    AwardHackathonHandler,
    SeedDataHackathonHandler,
    SearchFilterHackathonsHandler,
    CreateHackathonHandler,
    UpdateHackathonHandler,
    DeleteHackathonHandler,
  ],
})
export class HackathonModule {}
