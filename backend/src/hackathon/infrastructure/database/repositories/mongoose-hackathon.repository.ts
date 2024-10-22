import { InjectModel } from '@nestjs/mongoose';
import { Hackathon } from 'src/hackathon/domain/entities/hackathon.entity';
import { HackathonRepository } from 'src/hackathon/domain/repositories/hackathon.repository';
import { HackathonDocument } from '../schemas';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { UserDocument } from 'src/user/infrastructure/database/schemas';

export class MongooseHackathonRepository implements HackathonRepository {
  constructor(
    @InjectModel(HackathonDocument.name)
    private readonly hackathonModel: Model<HackathonDocument>,

    @InjectModel(UserDocument.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findById(id: string): Promise<HackathonDocument | null> {
    const hackathon = await this.hackathonModel.findById(id).lean().exec();
    if (!hackathon) return null;
    return hackathon;
  }

  async create(userId: string): Promise<string> {
    const existingUser = await this.userModel.findById(userId);

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    const createHackathon = new this.hackathonModel({
      user: userId,
    });

    const hackObj = await createHackathon.save();

    existingUser.hackathons.push(hackObj._id);
    await existingUser.save();

    return hackObj._id.toString();
  }

  async update(id: string, hackathon: Hackathon): Promise<HackathonDocument> {
    const updatedHackathon = await this.hackathonModel
      .findByIdAndUpdate(
        id,
        { $set: hackathon },
        { new: true, useFindAndModify: false },
      )
      .exec();

    if (!updatedHackathon) {
      throw new NotFoundException(`Hackathon with ID ${id} not found.`);
    }

    return updatedHackathon;
  }

  async delete(id: string): Promise<string> {
    const existingHackathon = await this.hackathonModel.findById(id);

    if (!existingHackathon) {
      throw new NotFoundException(`Hackathon with ID ${id} not found.`);
    }

    await this.hackathonModel.findByIdAndDelete(id);

    return 'Delete successfully';
  }
}
