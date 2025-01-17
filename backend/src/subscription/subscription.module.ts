import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SubscriptionDocument,
  SubscriptionSchema,
} from './infrastructure/schemas/subscription.schema';
import { SubscriptionController } from './adapter/controllers/subscription.controller';
import {
  SubscriptionTypeDocument,
  SubscriptionTypeSchema,
} from 'src/subscription_type/infrastructure/schemas/subscription-type.schema';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: SubscriptionDocument.name, schema: SubscriptionSchema },
      { name: SubscriptionTypeDocument.name, schema: SubscriptionTypeSchema },
    ]),
  ],
  controllers: [SubscriptionController],
})
export class SubscriptionModule {}
