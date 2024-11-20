import { ProjectDocument } from 'src/Project/infrastructure/database/schemas';
import { Project } from '../entities/project.entity';
export const PROJECT_REPOSITORY = 'ProjectRepository';
export interface ProjectRepository {
  findAll(page: number): Promise<ProjectDocument[]>;
  findById(id: string): Promise<ProjectDocument | null>;
  create(userId: string, title: string): Promise<string>;
  update(id: string, Project: Project): Promise<ProjectDocument | null>;
  delete(id: string): Promise<string>;
}
