import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
export class OrgSender {
  @Prop()
  id: string;
  @Prop()
  avatar: string;
  @Prop()
  name: string;
}

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'Chats',
})
export class ChatDocument {
  @Prop({ trim: true })
  chatName: string;

  @Prop({ default: false })
  isGroupChat: boolean;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'UserDocument' }] })
  users: Types.ObjectId[];

  @Prop()
  avatarGroupChat: string;

  @Prop()
  orgHackathon: string;

  @Prop({ type: OrgSender })
  orgSender: OrgSender;

  @Prop({ type: Types.ObjectId, ref: 'MessageDocument' })
  latestMessage: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'UserDocument' }] })
  groupAdmins: Types.ObjectId[];
}

export const ChatSchema = SchemaFactory.createForClass(ChatDocument);
