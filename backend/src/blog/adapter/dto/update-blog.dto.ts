import { IsOptional, IsString } from 'class-validator';
import { AuthoBlog } from './type.dto';

export class UpdateBlogDTO {
  @IsOptional()
  @IsString()
  blogTitle: string;

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
  @IsString()
  blogType: string;

  @IsOptional()
  isApproval: boolean;

  @IsOptional()
  autho: AuthoBlog;
}
