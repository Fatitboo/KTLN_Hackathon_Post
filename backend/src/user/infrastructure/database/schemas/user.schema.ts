import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { SocialType, UserType } from 'src/user/domain/entities/user.entity';
export class SettingRecommend {
  specialty?: string;
  skills?: string[];
  interestedIn?: string[];
  occupation?: string;
  currentLevel?: string;
}
export class SocialLink {
  type: SocialType;
  url: string;
}
// user
@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'Users',
})
export class UserDocument {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Hackathon' }] })
  hackathons: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Project' }] })
  projects: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Blog' }] })
  blogs: Types.ObjectId[];

  @Prop({ required: true })
  fullname: string;

  @Prop({ required: false })
  avatar: string;

  @Prop({ required: false, default: false })
  isVerify: boolean;

  @Prop({ required: false, default: true })
  isActive: boolean;

  @Prop({ required: false, default: false })
  isSetPersionalSetting: boolean;

  @Prop({ required: false })
  settingRecommend?: SettingRecommend;

  @Prop({ required: false })
  bio?: string;

  @Prop({ required: false })
  socialLinks?: SocialLink[];

  @Prop({ required: true })
  userType: UserType[];

  @Prop({ required: false })
  googleAccountId: string;

  @Prop({ required: false })
  githubAccountId: string;

  @Prop({ required: false })
  hashRefreshToken: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'HackathonDocument' }] })
  registerHackathons: Types.ObjectId[];

  @Prop()
  tokenVerify: string;

  @Prop()
  expiredDateTokenVerify: Date;

  @Prop()
  tokenResetPassword: string;

  @Prop()
  expiredDateTokenResetPassword: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument).index(
  {
    email: 1,
  },
  { unique: true },
);
