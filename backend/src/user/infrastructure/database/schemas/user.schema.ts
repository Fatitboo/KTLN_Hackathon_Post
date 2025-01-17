import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { UserType } from 'src/user/domain/entities/user.entity';
export class SettingRecommend {
  specialty?: string;
  skills?: string[];
  interestedIn?: string[];
  occupation?: string;
  currentLevel?: string;
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

  @Prop()
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'HackathonDocument' }] })
  hackathons: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'ProjectDocument' }] })
  projects: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'BlogDocument' }] })
  blogs: Types.ObjectId[];

  @Prop({ required: true })
  fullname: string;

  @Prop({ default: true })
  isUserSystem: boolean;

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
  facebookLink?: string;

  @Prop({ required: false })
  githubLink?: string;

  @Prop({ required: false })
  linkedinLink?: string;

  @Prop({ required: false })
  address?: string;

  @Prop({ required: false })
  dob?: Date;

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

  @Prop({ type: Object })
  achievements: object;

  @Prop()
  expiredDateTokenVerify: Date;

  @Prop()
  tokenResetPassword: string;

  @Prop()
  expiredDateTokenResetPassword: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'InvoiceDocument' }] })
  invoices: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(UserDocument).index(
  {
    email: 1,
  },
  { unique: true },
);
