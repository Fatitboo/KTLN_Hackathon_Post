import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: {
    createdAt: 'create_at',
    updatedAt: 'update_at',
  },
  collection: 'SubscriptionTypes',
})
export class SubscriptionTypeDocument {
  @Prop()
  type: string;

  @Prop()
  name: string;
}
export const SubscriptionTypeSchema = SchemaFactory.createForClass(
  SubscriptionTypeDocument,
);
