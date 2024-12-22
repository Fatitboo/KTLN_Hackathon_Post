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
  @Prop({ type: String })
  projectNameId: string;

  @Prop({ type: String })
  projectTitle: string;

  @Prop({ type: String })
  tagline: string;

  @Prop({ type: String })
  content: string;

  @Prop({
    default:
      'https://res.cloudinary.com/dvnxdtrzn/image/upload/v1732183629/shopDEV/imgDefaultProject_atbisz.gif',
  })
  thumnailImage: string;

  @Prop({ type: [String] })
  builtWith: string[];

  @Prop({ type: [String] })
  tryoutLinks: string[];

  @Prop({ type: [String] })
  likedBy: string[];

  @Prop({ type: [String] })
  createdByUsername: string[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'UserDocument' }] })
  createdBy: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'HackathonDocument' })
  registeredToHackathon: Types.ObjectId;

  @Prop({ type: Boolean })
  isSubmmited: boolean;

  @Prop({ type: String })
  teamName: string;

  @Prop({ type: String })
  teamType: string; // personal | team | solo

  @Prop({ type: [GalaryItem] })
  galary: GalaryItem[];

  @Prop({ type: [UpdateItem] })
  updates: UpdateItem[];

  @Prop({ type: Types.ObjectId, ref: 'UserDocument' })
  owner: Types.ObjectId;
}
export const ProjectSchema = SchemaFactory.createForClass(ProjectDocument);
