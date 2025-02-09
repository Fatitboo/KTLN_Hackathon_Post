import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export class Sender {
  @Prop()
  id: string;
  @Prop()
  avatar: string;
  @Prop()
  name: string;
  @Prop()
  type: string;
}
@Schema({
  timestamps: {
    createdAt: 'create_at',
    updatedAt: 'update_at',
  },
  collection: 'Notifications',
})
export class NotificationDocument {
  @Prop({
    enum: [
      'hackathon_update',
      'participation_confirmation',
      'invitation',
      'general',
    ],
    default: 'general',
  })
  type: string;

  @Prop({})
  sender: Sender;

  @Prop({})
  title: string;

  @Prop({})
  content: string;

  @Prop({ type: Object })
  additionalData: object;

  @Prop({ default: false })
  read: boolean;
}
export const NotificationSchema =
  SchemaFactory.createForClass(NotificationDocument);
