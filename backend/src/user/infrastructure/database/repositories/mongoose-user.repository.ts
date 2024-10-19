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

  async save(user: User): Promise<User> {
    const createdUser = new this.userModel({
      password: user.password,
      email: user.email,
      hashRefreshToken: user.hashRefreshToken,
    });
    const u = await createdUser.save();
    user.setId(u._id.toString());
    user.password = undefined;
    return user;
  }

  private toEntity(user: any): User {
    return new User(
      user._id.toString(),
      user.password,
      user.email,
      user.hashRefreshToken,
    );
  }
}
