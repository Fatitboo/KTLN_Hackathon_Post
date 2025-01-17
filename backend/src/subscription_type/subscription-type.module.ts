import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SubscriptionTypeDocument,
  SubscriptionTypeSchema,
} from './infrastructure/schemas/subscription-type.schema';
import { SubscriptionTypeController } from './adapter/controller/subscription-type.controller';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: SubscriptionTypeDocument.name, schema: SubscriptionTypeSchema },
    ]),
  ],
  controllers: [SubscriptionTypeController],
})
export class SubscriptionTypeModule {}
