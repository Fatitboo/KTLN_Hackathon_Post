import { IsString } from 'class-validator';

export class UpdateHackathonDTO {
  @IsString()
  hackathonName: string;
}
