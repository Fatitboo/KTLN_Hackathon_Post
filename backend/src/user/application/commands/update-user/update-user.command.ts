import {
  SettingRecommend,
  SocialLink,
} from 'src/user/domain/entities/user.entity';

export class UpdateUserCommandProps {
  updateType: string; // "setting_recommend", "profile_user", "avatar"
  fullname?: string;
  avatar?: string;
  bio?: string;
  socialLinks?: SocialLink[];
  address?: string;
  linkedinLink?: string;
  facebookLink?: string;
  githubLink?: string;
  dob?: string;
  settingRecommend?: SettingRecommend;
  isActive?: boolean;
  id: string;
}
export class UpdateUserCommand {
  constructor(public readonly props: UpdateUserCommandProps) {}
}
