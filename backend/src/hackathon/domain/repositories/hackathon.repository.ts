import { HackathonDocument } from 'src/hackathon/infrastructure/database/schemas';
import { GetAllRegisterUsersQueryProps } from 'src/hackathon/application/queries/get-all-register-users/get-all-register-users.query';
export const HACKATHON_REPOSITORY = 'HackathonRepository';

export interface HackathonRepository {
  findAll(userId: string, page: number): Promise<HackathonDocument[]>;
  findAllRegisterUser(props: GetAllRegisterUsersQueryProps): Promise<any>;
  findAllProject(id: string, type: string, page: number): Promise<any[]>;
  findById(
    id: string,
    userId?: string | undefined,
  ): Promise<HackathonDocument | null>;
  getHackathonComponent(
    id: string,
    type: string,
  ): Promise<HackathonDocument | null>;
  create(userId: string): Promise<string>;
  update(id: string, hackathon: any): Promise<HackathonDocument | null>;
  delete(userId: string, id: string): Promise<string>;
  award(hackathonId: string, hackathon: any): any;
}
