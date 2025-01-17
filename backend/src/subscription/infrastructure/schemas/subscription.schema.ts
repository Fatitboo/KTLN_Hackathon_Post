import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  timestamps: {
    createdAt: 'create_at',
    updatedAt: 'update_at',
  },
  collection: 'Subscriptions',
})
export class SubscriptionDocument {
  @Prop({ type: Types.ObjectId, ref: 'SubscriptionTypeDocument' })
  subscriptionTypeId: Types.ObjectId;

  @Prop()
  description: string[];

  @Prop()
  price: string;

  @Prop()
  periodType: string;
}
export const SubscriptionSchema =
  SchemaFactory.createForClass(SubscriptionDocument);
