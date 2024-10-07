import { InjectModel } from '@nestjs/mongoose';
import { Hackathon } from 'src/hackathon/domain/entities/hackathon.entity';
import { HackathonRepository } from 'src/hackathon/domain/repositories/hackathon.repository';
import { HackathonDocument } from '../schemas';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

export class MongooseHackathonRepository implements HackathonRepository {
  constructor(
    @InjectModel(HackathonDocument.name)
    private readonly hackathonModel: Model<HackathonDocument>,
  ) {}

  async findById(id: string): Promise<Hackathon | null> {
    const hackathon = await this.hackathonModel.findById(id).exec();
    if (!hackathon) return null;
    return new Hackathon(hackathon.id, hackathon.hackathonName);
  }

  async save(hackathon: Hackathon): Promise<Hackathon> {
    const createHackathon = new this.hackathonModel({
      hackathonName: hackathon.hackathonName,
    });

    const hackObj = await createHackathon.save();
    hackathon.setId(hackObj._id.toString());
    return hackathon;
  }

  async update(hackathon: Hackathon): Promise<Hackathon> {
    const existingHackathon = await this.hackathonModel.findById(hackathon.id);

    if (!existingHackathon) {
      throw new NotFoundException(
        `Hackathon with ID ${hackathon.id} not found.`,
      );
    }
    existingHackathon.hackathonName = hackathon.hackathonName;
    await existingHackathon.save();

    return hackathon;
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
