import { IsArray, IsOptional, IsString } from 'class-validator';
import {
  SettingRecommend,
  SocialLink,
} from 'src/user/domain/entities/user.entity';
export class UpdateUserDto {
  @IsString()
  updateType: string; // "setting_recommend", "profile_user"

  @IsString()
  @IsOptional()
  fullname?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsArray()
  @IsOptional()
  socialLinks?: SocialLink[];

  @IsOptional()
  settingRecommend?: SettingRecommend;
}
