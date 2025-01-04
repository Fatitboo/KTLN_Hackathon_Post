import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  timestamps: {
    createdAt: 'create_at',
    updatedAt: 'update_at',
  },
  collection: 'Invoices',
})
export class InvoiceDocument {
  @Prop({ type: Types.ObjectId, ref: 'UserDocument' })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'SubscriptionDocument' })
  subscriptionId: string;

  @Prop()
  price: string;

  @Prop()
  payType: string;

  @Prop()
  createDate: Date;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;
}
export const InvoiceSchema = SchemaFactory.createForClass(InvoiceDocument);
