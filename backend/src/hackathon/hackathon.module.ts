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

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: HackathonDocument.name, schema: HackathonSchema },
      { name: UserDocument.name, schema: UserSchema },
      { name: ProjectDocument.name, schema: ProjectSchema },
      { name: InteractionDocument.name, schema: InterationSchema },
    ]),
  ],
  controllers: [HackathonController],
  providers: [
    { provide: HACKATHON_REPOSITORY, useClass: MongooseHackathonRepository },
    GetHackathonHandler,
    GetHackathonsHandler,
    GetProjectsHandler,
    GetAllRegisterUsersHandler,
    SeedDataHackathonHandler,
    SearchFilterHackathonsHandler,
    CreateHackathonHandler,
    UpdateHackathonHandler,
    DeleteHackathonHandler,
  ],
})
export class HackathonModule {}
