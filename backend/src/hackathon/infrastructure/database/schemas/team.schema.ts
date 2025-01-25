import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  timestamps: {
    createdAt: 'create_at',
    updatedAt: 'update_at',
  },
  collection: 'Teams',
})
export class TeamDocument {
  @Prop({ type: Types.ObjectId, ref: 'HackathonDocument' })
  hackathonId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'UserDocument' })
  leaderId: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'UserDocument' }] })
  members: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'ProjectDocument' }] })
  projects: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'ProjectDocument' })
  submittedProjectId: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'TeamDocument' }], default: [] })
  invitations: Types.ObjectId[];

  @Prop({ enum: ['active', 'merged'], default: 'active' })
  status: 'active' | 'merged';
}
export const TeamSchema = SchemaFactory.createForClass(TeamDocument);
