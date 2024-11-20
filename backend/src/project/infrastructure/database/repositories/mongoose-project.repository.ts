import { InjectModel } from '@nestjs/mongoose';
import { ProjectDocument } from '../schemas';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { UserDocument } from 'src/user/infrastructure/database/schemas';
import { ProjectRepository } from 'src/project/domain/repositories/project.repository';
import { Project } from 'src/project/domain/entities/project.entity';

export class MongooseProjectRepository implements ProjectRepository {
  constructor(
    @InjectModel(ProjectDocument.name)
    private readonly ProjectModel: Model<ProjectDocument>,

    @InjectModel(UserDocument.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findAll(page: number): Promise<ProjectDocument[]> {
    const projects = await this.ProjectModel.find().lean().exec();
    if (!projects) return [];
    return projects;
  }

  async findById(id: string): Promise<ProjectDocument | null> {
    const project = await this.ProjectModel.findById(id).lean().exec();
    if (!project) return null;
    return project;
  }

  async create(userId: string, title: string): Promise<string> {
    const existingUser = await this.userModel.findById(userId);

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
    let projectNameId = `${title.trim().toLocaleLowerCase().replace(/ /g, '-')}`;

    const existProject = await this.ProjectModel.findOne({ projectNameId });
    if (existProject) {
      projectNameId =
        projectNameId + `-${existProject._id.toString().slice(0, 5)}`;
    }
    const createProject = new this.ProjectModel({
      owner: userId,
      projectTitle: title,
      projectNameId,
    });

    const prjObj = await createProject.save();

    existingUser.projects.push(prjObj._id);
    await existingUser.save();

    return prjObj._id.toString();
  }

  async update(id: string, project: Project): Promise<ProjectDocument> {
    let projectNameId = `${project.projectTitle.trim().toLocaleLowerCase().replace(/ /g, '-')}`;

    const existProject = await this.ProjectModel.findOne({ projectNameId });
    if (existProject) {
      projectNameId =
        projectNameId + `-${existProject._id.toString().slice(0, 5)}`;
    }
    project.setProjectNameId(projectNameId);
    const updatedProject = await this.ProjectModel.findByIdAndUpdate(
      id,
      { $set: project },
      { new: true, useFindAndModify: false },
    ).exec();

    if (!updatedProject) {
      throw new NotFoundException(`Project with ID ${id} not found.`);
    }

    return updatedProject;
  }

  async delete(id: string): Promise<string> {
    const existingProject = await this.ProjectModel.findById(id);

    if (!existingProject) {
      throw new NotFoundException(`Project with ID ${id} not found.`);
    }

    await this.ProjectModel.findByIdAndDelete(id);

    return 'Delete successfully';
  }
}
