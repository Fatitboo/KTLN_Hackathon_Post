import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatDocument, ChatSchema } from 'src/chat/schema/chat.schema';
import { MessageDocument, MessageSchema } from 'src/chat/schema/message.schema';
import {
  UserDocument,
  UserSchema,
} from 'src/user/infrastructure/database/schemas';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports: [
    ChatModule,
    MongooseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
      { name: ChatDocument.name, schema: ChatSchema },
      { name: MessageDocument.name, schema: MessageSchema },
    ]),
  ],
  providers: [MessageService],
  controllers: [MessageController],
  exports: [],
})
export class MessageModule {}
