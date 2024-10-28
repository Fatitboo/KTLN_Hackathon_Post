import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { User } from '../../../domain/entities/user.entity';
import { UserDocument } from '../schemas';

@Injectable()
export class MongooseUserRepository implements UserRepository {
  constructor(
    @InjectModel(UserDocument.name)
    private readonly userModel: Model<UserDocument>,
  ) {}
  async updateById(id: string, updateData: object): Promise<User | null> {
    const user = await this.userModel.findByIdAndUpdate(id, {
      ...updateData,
    });
    if (user) {
      return this.toEntity(user);
    }
    return null;
  }
  async findOne(filter: object): Promise<User | null> {
    const user = await this.userModel.findOne(filter);
    if (user) {
      return this.toEntity(user);
    }
    return null;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) return null;
    return this.toEntity(user);
  }

  async create(user: User): Promise<User> {
    const createdUser = new this.userModel({
      password: user._props.password,
      email: user._props.email,
      avatar: user._props.avatar,
      fullname: user._props.fullname,
      userType: user._props.userType,
      isSetPersionalSetting: false,
      isVerify: user._props.isVerify,
    });
    const u = await createdUser.save();
    user._props.isSetPersionalSetting = false;
    user.setId(u._id.toString());
    user.setPassword(undefined);
    return user;
  }

  private toEntity(user: any): User {
    return new User({
      id: user._id.toString(),
      email: user.email,
      fullname: user.fullname,
      userType: user.userType,
      avatar: user.avatar,
      password: user.password,
      googleAccountId: user.googleAccountId,
      githubAccountId: user.githubAccountId,
      isVerify: user.isVerify,
      isActive: user.isActive,
      isSetPersionalSetting: user.isSetPersionalSetting,
      settingRecommend: user.settingRecommend,
      socialLinks: user.socialLinks,
    });
  }
}
