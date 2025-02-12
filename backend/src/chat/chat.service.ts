import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatDocument } from './schema/chat.schema';
import { UserDocument } from 'src/user/infrastructure/database/schemas';
import { HackathonDocument } from 'src/hackathon/infrastructure/database/schemas';
@Injectable()
export class ChatService {
  constructor(
    @InjectModel(ChatDocument.name) private chatModel: Model<ChatDocument>,
    @InjectModel(UserDocument.name) private userModel: Model<UserDocument>,
    @InjectModel(HackathonDocument.name)
    private readonly hackathonModel: Model<HackathonDocument>,
  ) {}

  // Tạo hoặc lấy phòng chat một-một
  async accessChat({ userId }: { userId: string }, currentUserId: any) {
    if (!userId) {
      throw new NotFoundException('UserId param not sent with request');
    }

    const isChat = await this.chatModel
      .find({
        isGroupChat: false,
        $and: [
          { users: { $elemMatch: { $eq: currentUserId } } },
          { users: { $elemMatch: { $eq: userId } } },
        ],
      })
      .populate([
        {
          path: 'users',
          model: 'UserDocument',
          select: '_id email fullname avatar userType',
        },
        {
          path: 'latestMessage',
          model: 'MessageDocument',
        },
      ]);

    if (isChat.length > 0) {
      return isChat[0];
    } else {
      const chatData = {
        chatName: 'sender',
        isGroupChat: false,
        users: [currentUserId, userId],
      };

      const createdChat = await this.chatModel.create(chatData);
      const fullChat = await this.chatModel
        .findOne({ _id: createdChat._id })
        .populate({
          path: 'users',
          model: 'UserDocument',
          select: '_id email fullname avatar userType',
        });

      return fullChat;
    }
  }

  async accessChatHacakthon(hackathonId: string, currentUserId: any) {
    if (!hackathonId) {
      throw new NotFoundException('HackathonId param not sent with request');
    }
    const hackathon = await this.hackathonModel.findById(hackathonId);
    if (!hackathon) throw new NotFoundException('Hackathon not found');

    const isChat = await this.chatModel.findOne({
      isGroupChat: true,
      orgHackathon: hackathonId,
    });

    if (isChat) {
      const updatedChat = await this.chatModel
        .findByIdAndUpdate(
          isChat._id,
          {
            $addToSet: { users: currentUserId }, // Chỉ thêm nếu userId chưa tồn tại
          },
          { new: true }, // Trả về tài liệu đã cập nhật
        )
        .populate({
          path: 'users',
          model: 'UserDocument',
          select: '_id email fullname avatar userType',
        });
      return updatedChat;
    } else {
      const users = hackathon.registerUsers.map((item) =>
        item.userId.toString(),
      );
      const us = [...new Set([...users, hackathon.user, currentUserId])];
      const createdChat = await this.chatModel.create({
        chatName: `Group chat ${hackathon.hackathonName}`,
        users: us,
        isGroupChat: true,
        avatarGroupChat: hackathon.thumbnail,
        orgHackathon: hackathon._id.toString(),
        orgSender: {
          id: hackathon.user.toString(),
          avatar: hackathon.thumbnail,
          name: `Admin hackathon ${hackathon.hackathonName}`,
        },
        groupAdmins: [hackathon.user],
      });
      const fullChat = await this.chatModel
        .findOne({ _id: createdChat._id })
        .populate({
          path: 'users',
          model: 'UserDocument',
          select: '_id email fullname avatar userType',
        });

      return fullChat;
    }
  }

  // Lấy tất cả các phòng chat của người dùng
  async fetchChats(currentUserId: any) {
    const chats = await this.chatModel
      .find({ users: { $elemMatch: { $eq: currentUserId } } })
      .populate([
        {
          path: 'users',
          model: 'UserDocument',
          select: '_id email fullname avatar userType',
        },
        {
          path: 'groupAdmins',
          model: 'UserDocument',
          select: '_id email fullname avatar userType',
        },
        {
          path: 'latestMessage',
          model: 'MessageDocument',
        },
        {
          path: 'latestMessage.sender',
          model: 'UserDocument',
          select: '_id email fullname avatar userType',
        },
      ])
      .sort({ updatedAt: -1 });

    return chats;
  }

  // Tạo phòng nhóm mới
  async createGroupChat({ name, users }, currentUserId: any) {
    await Promise.all(
      users.map(async (userId) => {
        const u = await this.userModel.findById(userId);
        if (!u) throw new NotFoundException('Not found user');
      }),
    );

    users.push(currentUserId);

    const groupChat = await this.chatModel.create({
      chatName: name,
      users,
      isGroupChat: true,
      groupAdmins: [currentUserId],
    });

    const fullGroupChat = await this.chatModel
      .findOne({ _id: groupChat._id })
      .populate([
        {
          path: 'users',
          model: 'UserDocument',
          select: '_id email fullname avatar userType',
        },
        {
          path: 'groupAdmins',
          model: 'UserDocument',
          select: '_id email fullname avatar userType',
        },
      ]);

    return fullGroupChat;
  }

  // Đổi tên phòng nhóm
  async renameGroup(chatId: string, chatName: string) {
    const updatedChat = await this.chatModel
      .findByIdAndUpdate(chatId, { chatName }, { new: true })
      .populate([
        {
          path: 'users',
          model: 'UserDocument',
          select: '_id email fullname avatar userType',
        },
        {
          path: 'groupAdmins',
          model: 'UserDocument',
          select: '_id email fullname avatar userType',
        },
      ]);

    if (!updatedChat) {
      throw new NotFoundException('Chat Not Found');
    }

    return updatedChat;
  }

  // Xoá người dùng khỏi phòng nhóm
  async removeFromGroup(chatId: string, userId: string) {
    const removed = await this.chatModel
      .findByIdAndUpdate(chatId, { $pull: { users: userId } }, { new: true })
      .populate([
        {
          path: 'users',
          model: 'UserDocument',
          select: '_id email fullname avatar userType',
        },
        {
          path: 'groupAdmins',
          model: 'UserDocument',
          select: '_id email fullname avatar userType',
        },
      ]);

    if (!removed) {
      throw new NotFoundException('Chat Not Found');
    }

    return removed;
  }

  // Thêm người vào phòng nhóm
  async addToGroup(chatId: string, userId: string) {
    const added = await this.chatModel
      .findByIdAndUpdate(chatId, { $push: { users: userId } }, { new: true })
      .populate([
        {
          path: 'users',
          model: 'UserDocument',
          select: '_id email fullname avatar userType',
        },
        {
          path: 'groupAdmins',
          model: 'UserDocument',
          select: '_id email fullname avatar userType',
        },
      ]);

    if (!added) {
      throw new NotFoundException('Chat Not Found');
    }

    return added;
  }
}
