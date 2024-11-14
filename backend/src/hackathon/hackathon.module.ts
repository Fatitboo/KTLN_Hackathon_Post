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

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: HackathonDocument.name, schema: HackathonSchema },
      { name: UserDocument.name, schema: UserSchema },
    ]),
  ],
  controllers: [HackathonController],
  providers: [
    { provide: HACKATHON_REPOSITORY, useClass: MongooseHackathonRepository },
    GetHackathonHandler,
    GetHackathonsHandler,
    CreateHackathonHandler,
    UpdateHackathonHandler,
    DeleteHackathonHandler,
  ],
})
export class HackathonModule {}
