import { User } from '../entities/user.entity';
export const USER_REPOSITORY = 'UserRepository';
export interface UserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<User>;
}
