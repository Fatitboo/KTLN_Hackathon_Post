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
  settingRecommend?: SettingRecommend;
  id: string;
}
export class UpdateUserCommand {
  constructor(public readonly props: UpdateUserCommandProps) {}
}
