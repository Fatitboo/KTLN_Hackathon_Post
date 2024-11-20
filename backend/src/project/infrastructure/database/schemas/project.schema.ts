import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { GalaryItem, UpdateItem } from './type';

@Schema({
  timestamps: {
    createdAt: 'create_at',
    updatedAt: 'update_at',
  },
  collection: 'Projects',
})
export class ProjectDocument {
  @Prop()
  projectNameId: string;

  @Prop()
  projectTitle: string;

  @Prop()
  tagline: string;

  @Prop()
  content: string;

  @Prop()
  thumnailImage: string;

  @Prop({ type: [String] })
  builtWith: string[];

  @Prop({ type: [String] })
  likedBy: string[];

  @Prop({ type: [String] })
  createdByUsername: string[];

  @Prop({ type: [GalaryItem] })
  galary: GalaryItem[];

  @Prop({ type: [UpdateItem] })
  updates: UpdateItem[];

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: Types.ObjectId;
}
export const ProjectSchema = SchemaFactory.createForClass(ProjectDocument);
