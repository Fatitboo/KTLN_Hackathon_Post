import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  HackathonDocument,
  HackathonSchema,
} from 'src/hackathon/infrastructure/database/schemas';
import {
  UserDocument,
  UserSchema,
} from 'src/user/infrastructure/database/schemas';
import {
  ProjectDocument,
  ProjectSchema,
} from 'src/project/infrastructure/database/schemas';
import {
  InteractionDocument,
  InterationSchema,
} from 'src/hackathon/infrastructure/database/schemas/interaction.schema';
import { ChatDocument, ChatSchema } from './schema/chat.schema';
import { MessageDocument, MessageSchema } from './schema/message.schema';
import { ChatService } from './chat.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HackathonDocument.name, schema: HackathonSchema },
      { name: UserDocument.name, schema: UserSchema },
      { name: ProjectDocument.name, schema: ProjectSchema },
      { name: InteractionDocument.name, schema: InterationSchema },
      { name: ChatDocument.name, schema: ChatSchema },
      { name: MessageDocument.name, schema: MessageSchema },
    ]),
  ],
  providers: [ChatService],
  controllers: [ChatController],
  exports: [],
})
export class ChatModule {}
