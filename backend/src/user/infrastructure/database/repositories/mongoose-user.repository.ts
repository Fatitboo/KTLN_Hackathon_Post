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

  async findById(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) return null;
    return new User(user.id, user.username, user.password);
  }

  async save(user: User): Promise<User> {
    const createdUser = new this.userModel({
      username: user.username,
      password: user.password,
    });
    const u = await createdUser.save();
    user.setId(u._id.toString());
    return user;
  }
}
