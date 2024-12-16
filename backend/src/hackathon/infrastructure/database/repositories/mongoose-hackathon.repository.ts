import { InjectModel } from '@nestjs/mongoose';
import { Hackathon } from 'src/hackathon/domain/entities/hackathon.entity';
import { HackathonRepository } from 'src/hackathon/domain/repositories/hackathon.repository';
import { HackathonDocument } from '../schemas';
import { Model, Types } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { UserDocument } from 'src/user/infrastructure/database/schemas';
import { ProjectDocument } from 'src/project/infrastructure/database/schemas';

export class MongooseHackathonRepository implements HackathonRepository {
  constructor(
    @InjectModel(HackathonDocument.name)
    private readonly hackathonModel: Model<HackathonDocument>,

    @InjectModel(UserDocument.name)
    private readonly userModel: Model<UserDocument>,

    @InjectModel(ProjectDocument.name)
    private readonly projectDocument: Model<ProjectDocument>,
  ) {}

  async findAllProject(id: string, type: string, page: number): Promise<any[]> {
    const existingHackathon = await this.hackathonModel.findById(id).exec();
    if (!existingHackathon.registedTeams) return null;

    const submittions = existingHackathon.registedTeams;
    const rs: any[] = [];
    for (let index = 0; index < submittions.length; index++) {
      const element = submittions[index];
      const pId = element._id;
      const p = await this.projectDocument.findById(pId);
      if (!p) continue;
      const owner = await this.userModel.findById(p.owner);
      if (!owner) continue;
      rs.push({
        id: p._id,
        projectTitle: p.projectTitle,
        thumnailImage: p.thumnailImage,
        tagLine: p.tagline,
        owner: { uId: owner._id, name: owner.fullname, avatar: owner.avatar },
        createdBy: p.createdByUsername,
      });
    }
    return rs;
  }

  async findAllRegisterUser(id: string, page: number): Promise<any[]> {
    const existingHackathon = await this.hackathonModel.findById(id).exec();
    if (!existingHackathon.registerUsers) return null;

    const registerUsers = existingHackathon.registerUsers;
    const rs: any[] = [];
    for (let index = 0; index < registerUsers.length; index++) {
      const element = registerUsers[index];
      const uId = element.userId;
      const u = await this.userModel.findById(uId);
      if (!u) continue;
      const timestamp: number = Date.now();
      rs.push({
        userId: u._id.toString(),
        name: u.fullname,
        email: u.email,
        avatar: u.avatar,
        numProjects: u.projects.length,
        numFollows: parseInt(timestamp.toString().slice(-2)),
        numAchiements: parseInt(timestamp.toString().slice(6, 8)),
        settingRecommend: u.settingRecommend,
        status: element.status,
      });
    }
    return rs;
  }

  async findAll(page: number): Promise<HackathonDocument[]> {
    const hackathons = await this.hackathonModel.find().lean().exec();
    if (!hackathons) return [];
    return hackathons;
  }

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

  async delete(userId: string, id: string): Promise<string> {
    const existingHackathon = await this.hackathonModel.findById(id);

    if (!existingHackathon) {
      throw new NotFoundException(`Hackathon with ID ${id} not found.`);
    }

    const existingUser = await this.userModel.findById(userId);

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    await this.hackathonModel.findByIdAndDelete(id);
    await this.userModel.findByIdAndUpdate(
      userId,
      { $pull: { hackathons: new Types.ObjectId(id) } },
      { new: true },
    );

    return 'Delete successfully';
  }
}
