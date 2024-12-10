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
  searchKeyword?: string; // Tìm kiếm theo tên, tiêu đề hoặc tagline

  @IsOptional()
  @IsBoolean()
  withDemoVideos?: boolean; // Filter theo video demo

  @IsOptional()
  @IsBoolean()
  withGallery?: boolean; // Filter theo gallery

  @IsOptional()
  @IsBoolean()
  winnersOnly?: boolean; // Chỉ hiển thị project có giải thưởng

  @IsOptional()
  @IsBoolean()
  notHadPrizes?: boolean; // Chỉ hiển thị project không có giải thưởng

  @IsOptional()
  @IsArray()
  tags?: string[]; // Filter theo tags (danh sách)

  @IsOptional()
  @IsString()
  hackathonId?: string; // Lọc theo hackathon

  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number = 1; // Mặc định là trang 1

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number = 10;
}
