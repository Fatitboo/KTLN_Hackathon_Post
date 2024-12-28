import {
  IsOptional,
  IsString,
  IsBoolean,
  IsArray,
  IsNumber,
  Min,
} from 'class-validator';

export class FilterProjectsDto {
  @IsOptional()
  @IsString()
  searchKeyword?: string;

  @IsOptional()
  @IsBoolean()
  withDemoVideos?: boolean;

  @IsOptional()
  @IsBoolean()
  withGallery?: boolean;

  @IsOptional()
  @IsBoolean()
  winnersOnly?: boolean;

  @IsOptional()
  @IsBoolean()
  joinHackathon?: boolean;

  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsOptional()
  @IsString()
  hackathonId?: string;

  @IsOptional()
  @IsString()
  sortOption?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number = 10;
}
