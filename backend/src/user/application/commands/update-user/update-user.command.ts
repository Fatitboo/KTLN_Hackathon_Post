import {
  SettingRecommend,
  SocialLink,
} from 'src/user/domain/entities/user.entity';

export class UpdateUserCommandProps {
  updateType: string; // "setting_recommend", "profile_user"
  fullname?: string;
  bio?: string;
  socialLinks?: SocialLink[];
  settingRecommend?: SettingRecommend;
  id: string;
}
export class UpdateUserCommand {
  constructor(public readonly props: UpdateUserCommandProps) {}
}
