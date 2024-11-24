import { HackathonDocument } from 'src/hackathon/infrastructure/database/schemas';
import { Hackathon } from '../entities/hackathon.entity';
export const HACKATHON_REPOSITORY = 'HackathonRepository';

export interface HackathonRepository {
  findAll(page: number): Promise<HackathonDocument[]>;
  findAllRegisterUser(id: string, page: number): Promise<any[]>;
  findById(id: string): Promise<HackathonDocument | null>;
  create(userId: string): Promise<string>;
  update(id: string, hackathon: Hackathon): Promise<HackathonDocument | null>;
  delete(id: string): Promise<string>;
}
