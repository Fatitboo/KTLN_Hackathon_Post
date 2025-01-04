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
  userId: string;

  @Prop()
  subscriptionId: string;

  @Prop()
  price?: string;

  @Prop()
  payType?: string;
}
export const InvoiceSchema = SchemaFactory.createForClass(InvoiceDocument);
