import { IsString } from 'class-validator';

export class CreateHackathonDTO {
  @IsString()
  hackathonName: string;
}
