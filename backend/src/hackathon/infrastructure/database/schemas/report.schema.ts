import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  timestamps: {
    createdAt: 'create_at',
    updatedAt: 'update_at',
  },
  collection: 'Reports',
})
export class ReportDocument {
  @Prop({ type: Types.ObjectId, ref: 'UserDocument' })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'HackathonDocument' })
  hackathon: Types.ObjectId;

  @Prop()
  type: string;

  @Prop()
  content: string;
}
export const ReportSchema = SchemaFactory.createForClass(ReportDocument);
