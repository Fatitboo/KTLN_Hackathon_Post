import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'Messages',
})
export class MessageDocument {
  @Prop({ trim: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'UserDocument' })
  sender: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'ChatDocument' })
  chat: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'UserDocument' }] })
  readBy: Types.ObjectId[];
}

export const MessageSchema = SchemaFactory.createForClass(MessageDocument);
