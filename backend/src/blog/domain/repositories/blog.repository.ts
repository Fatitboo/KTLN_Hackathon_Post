import { BlogDocument } from 'src/blog/infrastructure/database/schemas';
import { Blog } from '../entities/blog.entity';
export const BLOG_REPOSITORY = 'BlogRepository';
export interface BlogRepository {
  findAll(page: number): Promise<BlogDocument[]>;
  findById(id: string): Promise<BlogDocument | null>;
  create(userId: string, blog: Blog): Promise<BlogDocument | null>;
  update(id: string, blog: Blog): Promise<BlogDocument | null>;
  delete(id: string): Promise<string>;
}
