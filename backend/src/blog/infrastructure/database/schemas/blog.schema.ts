import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import { Types } from 'mongoose';
export class AuthoBlog {
  @Prop()
  @IsString()
  name: string;

  @Prop()
  @IsString()
  title: string;

  @Prop()
  createdAt: string;
}

@Schema({
  timestamps: {
    createdAt: 'create_at',
    updatedAt: 'update_at',
  },
  collection: 'Blogs',
})
export class BlogDocument {
  @Prop()
  blogTitle: string;

  @Prop()
  blogType: string;

  @Prop()
  tagline: string;

  @Prop()
  content: string;

  @Prop()
  thumnailImage?: string;

  @Prop()
  videoLink?: string;

  @Prop({ default: false })
  isApproval: boolean;

  @Prop({ type: AuthoBlog })
  autho: AuthoBlog;

  @Prop({ type: Types.ObjectId, ref: 'UserDocument', required: true })
  owner: Types.ObjectId;
}
export const BlogSchema = SchemaFactory.createForClass(BlogDocument);
