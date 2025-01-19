import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ChatDocument } from 'src/chat/schema/chat.schema';
import { MessageDocument } from 'src/chat/schema/message.schema';
import { UserDocument } from 'src/user/infrastructure/database/schemas';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(MessageDocument.name)
    private messageModel: Model<MessageDocument>,
    @InjectModel(UserDocument.name) private userModel: Model<UserDocument>,
    @InjectModel(ChatDocument.name) private chatModel: Model<ChatDocument>,
  ) {}

  // Lấy tất cả tin nhắn từ phòng chat
  async allMessages(chatId: string) {
    console.log('🚀 ~ MessageService ~ allMessages ~ chatId:', chatId);
    try {
      const messages = await this.messageModel
        .find({ chat: new Types.ObjectId(chatId) })
        .populate([
          {
            path: 'sender',
            model: 'UserDocument',
            select: '_id email fullname avatar userType',
          },
          {
            path: 'chat',
            model: 'ChatDocument',
          },
        ]);
      return messages;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Gửi tin nhắn
  async sendMessage(
    { content, chatId }: { content: string; chatId: string },
    currentUserId: string,
  ) {
    if (!content || !chatId) {
      throw new BadRequestException('Invalid data passed into request');
    }

    try {
      const message = await this.messageModel.create({
        sender: new Types.ObjectId(currentUserId),
        content,
        chat: new Types.ObjectId(chatId),
      });
      await this.chatModel.findByIdAndUpdate(chatId, {
        latestMessage: message._id,
      });

      return await this.messageModel.findById(message._id).populate([
        {
          path: 'sender',
          model: 'UserDocument',
          select: '_id email fullname avatar userType',
        },
        {
          path: 'chat',
          model: 'ChatDocument',
        },
      ]);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
