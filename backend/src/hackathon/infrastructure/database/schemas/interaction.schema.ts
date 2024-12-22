import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export enum TEAM_STATUS {
  HAD_TEAM = 'had_team',
  WORKING_SOLO = 'working_solo',
  FINDING_TEAMATE = 'finding_teamate',
}

@Schema({
  timestamps: {
    createdAt: 'create_at',
    updatedAt: 'update_at',
  },
  collection: 'Interactions',
})
export class InteractionDocument {
  @Prop({ type: Types.ObjectId, ref: 'UserDocument' })
  user_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'HackathonDocument' })
  hackathon: Types.ObjectId;

  @Prop()
  hackathon_id: number;

  @Prop()
  interaction_type: string; // view, join, like

  @Prop({ type: String, enum: TEAM_STATUS })
  status: TEAM_STATUS;
}
export const InterationSchema =
  SchemaFactory.createForClass(InteractionDocument);
