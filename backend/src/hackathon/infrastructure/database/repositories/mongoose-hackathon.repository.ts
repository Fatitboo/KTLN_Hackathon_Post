import { InjectModel } from '@nestjs/mongoose';
import { Hackathon } from 'src/hackathon/domain/entities/hackathon.entity';
import { HackathonRepository } from 'src/hackathon/domain/repositories/hackathon.repository';
import { HackathonDocument } from '../schemas';
import { Model, PipelineStage, Types } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { UserDocument } from 'src/user/infrastructure/database/schemas';
import { ProjectDocument } from 'src/project/infrastructure/database/schemas';
import { GetAllRegisterUsersQueryProps } from 'src/hackathon/application/queries/get-all-register-users/get-all-register-users.query';
import { InteractionDocument } from '../schemas/interaction.schema';

export class MongooseHackathonRepository implements HackathonRepository {
  constructor(
    @InjectModel(HackathonDocument.name)
    private readonly hackathonModel: Model<HackathonDocument>,

    @InjectModel(UserDocument.name)
    private readonly userModel: Model<UserDocument>,

    @InjectModel(ProjectDocument.name)
    private readonly projectDocument: Model<ProjectDocument>,

    @InjectModel(InteractionDocument.name)
    private readonly interactionModel: Model<InteractionDocument>,
  ) {}
  async award(hackathonId: string, hackathon: any) {
    await this.hackathonModel
      .findByIdAndUpdate(
        hackathonId,
        { prizes: hackathon.hackathon.prizes },
        { new: true, useFindAndModify: false },
      )
      .exec();
  }

  async findAllProject(id: string, type: string, page: number): Promise<any[]> {
    const existingHackathon = await this.hackathonModel.findById(id).exec();
    if (!existingHackathon.registedTeams) return null;

    const submittions = existingHackathon.registedTeams;
    const rs: any[] = [];
    for (let index = 0; index < submittions.length; index++) {
      const element = submittions[index];
      const pId = element._id;
      const p = await this.projectDocument.findById(pId).populate({
        path: 'createdBy',
        model: 'UserDocument',
        select: '_id fullname avatar',
      });
      if (!p) continue;
      const owner = await this.userModel.findById(p.owner);
      if (!owner) continue;
      rs.push({
        id: p._id,
        projectTitle: p.projectTitle,
        thumnailImage: p.thumnailImage,
        teamName: p.teamName ?? `Team ${p.owner.toString().substring(0, 5)}`,
        tagLine: p.tagline,
        owner: { uId: owner._id, name: owner.fullname, avatar: owner.avatar },
        createdByUsername: p.createdByUsername,
        createdBy: p.createdBy,
        block: p.block,
      });
    }
    return rs;
  }

  async findAllRegisterUser(
    props: GetAllRegisterUsersQueryProps,
  ): Promise<any> {
    const {
      id,
      search,
      status,
      specialty,
      skills,
      interestedIn,
      sort,
      page = 1,
      limit = 10,
    } = props;

    const hackathon = await this.hackathonModel
      .findById(id)
      .populate({
        path: 'registerUsers.userId',
        model: 'UserDocument',
        select:
          'email fullname settingRecommend avatar projects followBy achievement _id createdAt',
      })
      .lean();

    if (!hackathon) {
      throw new Error('Hackathon not found');
    }

    // Lọc registerUsers theo các điều kiện
    let filteredUsers = hackathon.registerUsers.filter((registerUser) => {
      const user = registerUser.userId as any;
      if (
        search &&
        !(
          user.fullname.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
        )
      ) {
        return false;
      }

      // Kiểm tra status
      if (status && !status.includes(registerUser.status.toString())) {
        return false;
      }

      // Kiểm tra specialty, skills và interestedIn
      const setting = user.settingRecommend || {};
      if (specialty && !specialty.includes(setting.specialty)) {
        return false;
      }

      if (skills && !skills.some((skill) => setting.skills?.includes(skill))) {
        return false;
      }

      if (
        interestedIn &&
        !interestedIn.some((interest) =>
          setting.interestedIn?.includes(interest),
        )
      ) {
        return false;
      }

      return true;
    });

    if (sort === 'newest') {
      filteredUsers = filteredUsers.sort((a, b) => {
        const dateA = new Date((a.userId as any).createdAt).getTime(); // Assuming `createdAt` exists for the user
        const dateB = new Date((b.userId as any).createdAt).getTime();

        return dateB - dateA; // Sort descending by created date (newest first)
      });
    } else if (sort === 'projects') {
      filteredUsers = filteredUsers.sort((a, b) => {
        const projectCountA = (a.userId as any).projects
          ? (a.userId as any).projects.length
          : 0; // Assuming `projects` is an array
        const projectCountB = (b.userId as any).projects
          ? (b.userId as any).projects.length
          : 0;
        return projectCountB - projectCountA; // Sort descending by project count (most projects first)
      });
    }

    // Thực hiện phân trang
    const total = filteredUsers.length; // Tổng số kết quả sau khi lọc
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    filteredUsers = filteredUsers.slice(startIndex, endIndex);
    console.log(
      '🚀 ~ MongooseHackathonRepository ~ filteredUsers:',
      filteredUsers,
    );

    return {
      data: filteredUsers,
      total, // Tổng số kết quả
      page: Number(page),
      limit: Number(limit),
    };
  }

  async findAll(page: number): Promise<HackathonDocument[]> {
    const hackathons = await this.hackathonModel.find().lean().exec();
    if (!hackathons) return [];
    return hackathons;
  }

  async findById(
    id: string,
    userId?: string | undefined,
  ): Promise<HackathonDocument | null> {
    const hackathon = await this.hackathonModel.findById(id).lean().exec();
    if (!hackathon) return null;
    if (hackathon.hackathonIntegrateId && userId) {
      const u = await this.userModel.findById(userId).lean().exec();
      if (u) {
        await this.interactionModel.create({
          user_id: new Types.ObjectId(userId),
          hackathon: hackathon._id,
          hackathon_id: hackathon.hackathonIntegrateId,
          interaction_type: 'view',
        });
      }
    }
    return hackathon;
  }

  async create(userId: string): Promise<string> {
    const existingUser = await this.userModel.findById(userId);

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
    const max = await this.hackathonModel
      .findOne({})
      .sort({ hackathonIntegrateId: -1 }) // Sort by hackathonIntegrateId in descending order
      .select('hackathonIntegrateId') // Select only the field
      .lean();

    const nextHackathonIntegrateId = (max?.hackathonIntegrateId || 0) + 1;
    const createHackathon = new this.hackathonModel({
      user: userId,
      hackathonIntegrateId: nextHackathonIntegrateId,
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
