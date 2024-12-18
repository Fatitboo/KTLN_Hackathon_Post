import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  Criteria,
  DateRange,
  Judges,
  Prize,
  Range,
  Submission,
  Task,
  TeamRange,
} from './type.dto';

export class UpdateHackathonDTO {
  @IsOptional()
  @IsString()
  hackathonName?: string;

  @IsOptional()
  @IsString()
  tagline?: string;

  @IsOptional()
  @IsEmail()
  managerMail?: string;

  @IsOptional()
  @IsString()
  hostName?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  hackathonTypes?: string[];

  @IsOptional()
  @IsString()
  applyFor?: string;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @IsOptional()
  participantAge?: Range;

  @IsOptional()
  teamRequirement?: TeamRange;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsOptional()
  @IsString()
  headerTitleImage?: string;

  @IsOptional()
  @IsString()
  mainDescription?: string;

  @IsOptional()
  @IsString()
  videoDescription?: string;

  @IsOptional()
  @IsString()
  submissionDescription?: string;

  @IsOptional()
  @IsString()
  ruleDescription?: string;

  @IsOptional()
  @IsString()
  resourceDescription?: string;

  @IsOptional()
  @IsString()
  communityChatLink?: string;

  @IsOptional()
  @IsArray()
  tasks?: Task[];

  @IsOptional()
  @IsString()
  subjectMailTitle?: string;

  @IsOptional()
  @IsString()
  contentMailRegister?: string;

  @IsOptional()
  submissions?: Submission;

  @IsOptional()
  judgingType?: string;

  @IsOptional()
  judgingPeriod?: DateRange;

  @IsOptional()
  judges?: Judges[];

  @IsOptional()
  criteria?: Criteria[];

  @IsOptional()
  winnersAnnounced?: string;

  @IsOptional()
  prizeCurrency?: string;

  @IsOptional()
  prizes?: Prize[];

  @IsOptional()
  block?: boolean;

  @IsOptional()
  location?: string;
}
