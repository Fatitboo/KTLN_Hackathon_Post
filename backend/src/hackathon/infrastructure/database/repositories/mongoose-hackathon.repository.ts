import { InjectModel } from '@nestjs/mongoose';
import { Hackathon } from 'src/hackathon/domain/entities/hackathon.entity';
import { HackathonRepository } from 'src/hackathon/domain/repositories/hackathon.repository';
import { HackathonDocument } from '../schemas';
import { Model, Types } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { UserDocument } from 'src/user/infrastructure/database/schemas';
import { ProjectDocument } from 'src/project/infrastructure/database/schemas';
import { GetAllRegisterUsersQueryProps } from 'src/hackathon/application/queries/get-all-register-users/get-all-register-users.query';

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

  async findAllRegisterUser(
    props: GetAllRegisterUsersQueryProps,
  ): Promise<any> {
    // const existingHackathon = await this.hackathonModel
    //   .findById(props.id)
    //   .populate({
    //     path: 'registerUsers.userId',
    //     model: 'UserDocument',
    //     select: 'email fullname settingRecommend',
    //   })
    //   .exec();
    // if (!existingHackathon.registerUsers) return null;
    // return existingHackathon.registerUsers;
    // const registerUsers = existingHackathon.registerUsers;
    // const rs: any[] = [];
    // for (let index = 0; index < registerUsers.length; index++) {
    //   const element = registerUsers[index];
    //   const uId = element.userId;
    //   const u = await this.userModel.findById(uId);
    //   if (!u) continue;
    //   const timestamp: number = Date.now();
    //   rs.push({
    //     userId: u._id.toString(),
    //     name: u.fullname,
    //     email: u.email,
    //     avatar: u.avatar,
    //     numProjects: u.projects.length,
    //     numFollows: parseInt(timestamp.toString().slice(-2)),
    //     numAchiements: parseInt(timestamp.toString().slice(6, 8)),
    //     settingRecommend: u.settingRecommend,
    //     status: element.status,
    //   });
    // }
    // return rs;
    const {
      id,
      search,
      status,
      specialty,
      skills,
      interestedIn,
      page = 1,
      limit = 10,
    } = props;

    const hackathon = await this.hackathonModel
      .findById(id)
      .populate({
        path: 'registerUsers.userId',
        model: 'UserDocument',
        select:
          'email fullname settingRecommend avatar projects followBy achievement',
      })
      .lean();

    if (!hackathon) {
      throw new Error('Hackathon not found');
    }

    // Lọc registerUsers theo các điều kiện
    let filteredUsers = hackathon.registerUsers.filter((registerUser) => {
      const user = registerUser.userId as any;

      // Kiểm tra name và email
      if (
        search &&
        !user.fullname.toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }
      // Kiểm tra status
      if (status && registerUser.status !== status) {
        return false;
      }

      // Kiểm tra specialty, skills và interestedIn
      const setting = user.settingRecommend || {};
      if (specialty && setting.specialty !== specialty) {
        return false;
      }

      if (skills && !skills.every((skill) => setting.skills?.includes(skill))) {
        return false;
      }

      if (
        interestedIn &&
        !interestedIn.every((interest) =>
          setting.interestedIn?.includes(interest),
        )
      ) {
        return false;
      }

      return true;
    });

    // Thực hiện phân trang
    const total = filteredUsers.length; // Tổng số kết quả sau khi lọc
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    filteredUsers = filteredUsers.slice(startIndex, endIndex);

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
