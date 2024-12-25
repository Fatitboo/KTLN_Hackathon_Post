import { ProjectDocument } from 'src/Project/infrastructure/database/schemas';
import { Project } from '../entities/project.entity';
export const PROJECT_REPOSITORY = 'ProjectRepository';
export interface ProjectRepository {
  findAll(page: number): Promise<ProjectDocument[]>;
  findProjectRegisteredHackathon(
    userId: string,
    hackathonId: string,
  ): Promise<any[]>;
  findById(id: string): Promise<ProjectDocument | null>;
  findMembersProject(id: string): Promise<any>;
  create(
    userId: string,
    title: string,
    hackathonId: string | undefined,
    teamType: string | undefined,
  ): Promise<string>;
  update(id: string, Project: Project): Promise<ProjectDocument | null>;
  delete(id: string): Promise<string>;
}
