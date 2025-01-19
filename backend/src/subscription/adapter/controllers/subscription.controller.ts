import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubscriptionDocument } from 'src/subscription/infrastructure/schemas/subscription.schema';
import { SubscriptionTypeDocument } from 'src/subscription_type/infrastructure/schemas/subscription-type.schema';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @InjectModel(SubscriptionDocument.name)
    private readonly subscriptionModel: Model<SubscriptionDocument>,

    @InjectModel(SubscriptionTypeDocument.name)
    private readonly subscriptionTypeModel: Model<SubscriptionTypeDocument>,
  ) {}

  @Get()
  async getSubscriptions() {
    const subscriptions = await this.subscriptionModel
      .find()
      .populate('subscriptionTypeId')
      .exec();
    return subscriptions;
  }

  @Post()
  async createSubscription(
    @Body()
    body: {
      subscriptionType: string;
      price: string;
      description: string[];
      periodType: string;
    },
  ) {
    const createSubscription = new this.subscriptionModel({
      subscriptionTypeId: body.subscriptionType,
      description: body.description,
      periodType: body.periodType,
      price: body.price,
    });

    const prjObj = await createSubscription.save();
    const result = prjObj._id.toString();
    return { _id: result };
  }

  @Put(':id')
  async updateSubscription(
    @Param('id') id: string,
    @Body()
    body: {
      subscriptionType: string;
      price: string;
      description: string[];
      periodType: string;
    },
  ) {
    const updatedSubscriptionType = await this.subscriptionModel
      .findByIdAndUpdate(
        id,
        { $set: body },
        { new: true, useFindAndModify: false },
      )
      .exec();

    return { _id: updatedSubscriptionType._id.toString() };
  }

  @Delete(':id')
  async deleteSubscription(@Param('id') id: string) {
    if (id == null) throw new Error('Id is empty');
    await this.subscriptionModel.findByIdAndDelete(id);

    return { _id: id };
  }
}
