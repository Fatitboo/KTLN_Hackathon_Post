import { Hackathon } from '../entities/hackathon.entity';
export const HACKATHON_REPOSITORY = 'HackathonRepository';
export interface HackathonRepository {
  findById(id: string): Promise<Hackathon | null>;
  save(hackathon: Hackathon): Promise<Hackathon>;
  update(hackathon: Hackathon): Promise<Hackathon | null>;
  delete(id: string): Promise<string>;
}
