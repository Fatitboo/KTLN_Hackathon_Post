import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { User } from '../../../domain/entities/user.entity';
import { UserDocument } from '../schemas';
import {
  HackathonDocument,
  TEAM_STATUS,
} from 'src/hackathon/infrastructure/database/schemas';
import { ProjectDocument } from 'src/project/infrastructure/database/schemas';

@Injectable()
export class MongooseUserRepository implements UserRepository {
  constructor(
    @InjectModel(UserDocument.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(ProjectDocument.name)
    private readonly projectModel: Model<ProjectDocument>,
    @InjectModel(HackathonDocument.name)
    private readonly hackathonModel: Model<HackathonDocument>,
  ) {}
  searchUser(
    registeredHackathonId?: string,
    searchQuery?: string,
    searchTerm?: string,
  ): Promise<any> {
    const query: any = {
      ...(registeredHackathonId !== ''
        ? { registerHackathons: new Types.ObjectId(registeredHackathonId) }
        : {}),
      $or: [],
    };
    const orQuery: any = [];
    // Thêm điều kiện tìm kiếm
    if (searchTerm === 'all') {
      orQuery.push({ fullname: { $regex: searchQuery, $options: 'i' } });
      orQuery.push({ email: { $regex: searchQuery, $options: 'i' } });
    }

    if (searchTerm === 'email') {
      orQuery.push({ email: { $regex: searchQuery, $options: 'i' } });
    }
    query.$or = orQuery;
    return this.userModel
      .find(query)
      .select('fullname email avatar isVerify') // Chọn các trường cần trả về
      .exec();
  }
  async addUserRegisterToHackathon(
    userId: string,
    hackathonId: string,
    additionalInfo: any,
  ): Promise<any> {
    const existingUser = await this.userModel.findById(userId);

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    const existingHackathon = await this.hackathonModel.findById(hackathonId);

    if (!existingHackathon) {
      throw new NotFoundException(`Hackathon with ID ${userId} not found.`);
    }
    const userExists = existingHackathon.registerUsers.some(
      (user) => user.userId.toString() === userId,
    );

    if (userExists) {
      throw new Error('User already registered');
    }
    existingUser.registerHackathons.push(existingHackathon._id);
    existingHackathon.registerUsers.push({
      userId: existingUser._id.toString(),
      ...additionalInfo,
    });

    // check has team
    let projectId;
    const isHadTeam = additionalInfo.status;
    if (isHadTeam === TEAM_STATUS.HAD_TEAM) {
      const createProject = new this.projectModel({
        owner: userId,
        teamName: 'Untitled',
        createdByUsername: [userId],
        createdBy: [existingUser._id],
        teamType: 'team',
        registeredToHackathon: existingHackathon._id,
      });

      const prjObj = await createProject.save();
      projectId = prjObj._id.toString();

      existingUser.projects.push(prjObj._id);
      existingHackathon.registedTeams.push(prjObj._id);
    }

    await existingUser.save();
    await existingHackathon.save();
    return {
      projectId,
      teamStatus: isHadTeam,
      hackathonId,
    };
  }
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
      googleAccountId: user._props.googleAccountId,
      githubAccountId: user._props.githubAccountId,
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
      address: user.address,
    });
  }
}
