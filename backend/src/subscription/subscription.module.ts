import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SubscriptionDocument,
  SubscriptionSchema,
} from './infrastructure/schemas/subscription.schema';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: SubscriptionDocument.name, schema: SubscriptionSchema },
    ]),
  ],
  providers: [],
})
export class SubscriptionModule {}
