import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

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

  @Prop({ required: false })
  googleId: string;

  @Prop({ required: false })
  githubId: string;

  @Prop({ required: false })
  hashRefreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
