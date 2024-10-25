import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { UserType } from 'src/user/domain/entities/user.entity';

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

  @Prop({ required: true })
  fullname: string;

  @Prop({ required: false })
  avatar: string;

  @Prop({ required: false, default: false })
  isVerify: string;

  @Prop({ required: true })
  userType: UserType[];

  @Prop({ required: false })
  googleAccountId: string;

  @Prop({ required: false })
  githubAccountId: string;

  @Prop({ required: false })
  hashRefreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument).index(
  {
    email: 1,
  },
  { unique: true },
);
