import { User } from '../entities/user.entity';
export const USER_REPOSITORY = 'UserRepository';
export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findOne(filter: object): Promise<User | null>;
  create(user: User): Promise<User>;
  updateById(id: string, updateData: object): Promise<User>;
  addUserRegisterToHackathon(
    userId: string,
    hackathonId: string,
    additionalInfo: any,
  ): Promise<string>;
}
