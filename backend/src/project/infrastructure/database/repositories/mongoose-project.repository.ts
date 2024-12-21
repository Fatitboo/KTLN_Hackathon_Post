import { InjectModel } from '@nestjs/mongoose';
import { ProjectDocument } from '../schemas';
import { Model, Types } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { UserDocument } from 'src/user/infrastructure/database/schemas';
import { ProjectRepository } from 'src/project/domain/repositories/project.repository';
import { Project } from 'src/project/domain/entities/project.entity';
import { HackathonDocument } from 'src/hackathon/infrastructure/database/schemas';

export class MongooseProjectRepository implements ProjectRepository {
  constructor(
    @InjectModel(ProjectDocument.name)
    private readonly projectModel: Model<ProjectDocument>,

    @InjectModel(HackathonDocument.name)
    private readonly hackathonModel: Model<HackathonDocument>,

    @InjectModel(UserDocument.name)
    private readonly userModel: Model<UserDocument>,
  ) {}
  async findProjectRegisteredHackathon(
    userId: string,
    hackathonId: string,
  ): Promise<any[]> {
    const projects = await this.projectModel
      .find({
        createdBy: new Types.ObjectId(userId),
        registeredToHackathon: new Types.ObjectId(hackathonId),
      })
      .exec();
    return projects;
  }

  async findAll(page: number): Promise<ProjectDocument[]> {
    const projects = await this.projectModel.find().lean().exec();
    if (!projects) return [];
    return projects;
  }

  async findById(id: string): Promise<ProjectDocument | null> {
    const project = await this.projectModel
      .findById(id)
      .populate([
        { path: 'owner', select: '_id email fullname avatar' },
        {
          path: 'createdBy',
          model: 'UserDocument',
          select: '_id email fullname avatar',
        },
        {
          path: 'registeredToHackathon',
          model: 'HackathonDocument',
          select: '_id hackathonName hostName thumbnail',
        },
      ])
      .exec();
    if (!project) return null;
    return project;
  }

  async create(
    userId: string,
    title: string,
    hackathonId: string | undefined,
    teamType: string | undefined,
  ): Promise<string> {
    const existingUser = await this.userModel.findById(userId);

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
    let projectNameId = `${title.trim().toLocaleLowerCase().replace(/ /g, '-')}`;
    const timestamp: number = Date.now();

    const existProject = await this.projectModel.findOne({ projectNameId });
    if (existProject) {
      projectNameId =
        projectNameId +
        `-${existProject._id.toString().slice(0, 4)}${timestamp.toString().slice(-4)}`;
    }
    const createProject = new this.projectModel({
      owner: userId,
      projectTitle: title,
      projectNameId,
      teamName: 'Untitled',
      createdByUsername: [userId],
      createdBy: [existingUser._id],
      teamType,
    });

    const prjObj = await createProject.save();

    existingUser.projects.push(prjObj._id);
    await existingUser.save();
    if (hackathonId) {
      const existHackathon = await this.hackathonModel.findById(hackathonId);
      if (!existHackathon) {
        throw new NotFoundException(
          `Hackathon with ID ${hackathonId} not found.`,
        );
      }
      existHackathon.registedTeams.push(prjObj._id);
      await existHackathon.save();
    }
    return prjObj._id.toString();
  }

  async update(id: string, project: Project): Promise<ProjectDocument> {
    let projectNameId = project.projectTitle
      ? `${project.projectTitle.trim().toLocaleLowerCase().replace(/ /g, '-')}`
      : project.projectTitle;

    const existProject = await this.projectModel.findOne({ projectNameId });
    const timestamp: number = Date.now();

    if (existProject && existProject?._id.toString() !== id) {
      projectNameId =
        projectNameId +
        `-${existProject._id.toString().slice(0, 4)}${timestamp.toString().slice(-4)}`;
    }
    project.setProjectNameId(projectNameId);
    const updatedProject = await this.projectModel
      .findByIdAndUpdate(
        id,
        { $set: project },
        { new: true, useFindAndModify: false },
      )
      .exec();

    if (!updatedProject) {
      throw new NotFoundException(`Project with ID ${id} not found.`);
    }

    return updatedProject;
  }

  async delete(id: string): Promise<string> {
    const existingProject = await this.projectModel.findById(id);

    if (!existingProject) {
      throw new NotFoundException(`Project with ID ${id} not found.`);
    }

    await this.projectModel.findByIdAndDelete(id);

    return 'Delete successfully';
  }
}
