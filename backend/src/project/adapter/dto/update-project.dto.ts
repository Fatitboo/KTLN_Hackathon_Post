import { IsArray, IsOptional, IsString } from 'class-validator';
import { GalaryItem, UpdateItem } from './type.dto';

export class UpdateProjectDTO {
  @IsOptional()
  @IsString()
  projectTitle: string;

  @IsOptional()
  @IsString()
  tagline: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  thumnailImage: string;

  @IsOptional()
  @IsArray()
  builtWith: string[];

  @IsOptional()
  @IsArray()
  tryoutLinks: string[];

  @IsOptional()
  @IsArray()
  likedBy: string[];

  @IsOptional()
  @IsArray()
  createdByUsername: string[];

  @IsOptional()
  @IsArray()
  galary: GalaryItem[];

  @IsOptional()
  @IsArray()
  updates: UpdateItem[];
}
