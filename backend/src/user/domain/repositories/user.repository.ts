import { User } from '../entities/user.entity';
export const USER_REPOSITORY = 'UserRepository';
export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findOne(filter: object): Promise<User | null>;
  save(user: User): Promise<User>;
  updateById(id: string, updateData: object): Promise<User>;
}
