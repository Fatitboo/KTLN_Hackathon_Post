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
import { SubscriptionTypeDocument } from 'src/subscription_type/infrastructure/schemas/subscription-type.schema';

@Controller('subscription-types')
export class SubscriptionTypeController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @InjectModel(SubscriptionTypeDocument.name)
    private readonly subscriptionTypeModel: Model<SubscriptionTypeDocument>,
  ) {}

  @Get()
  async getAllSubscriptionType() {
    return await this.subscriptionTypeModel.find().exec();
  }

  @Post()
  async createSubscriptionType(@Body() body: { name: string; type: string }) {
    const createSubscriptionType = new this.subscriptionTypeModel({
      name: body.name,
      type: body.type,
    });

    await createSubscriptionType.save();
    return createSubscriptionType;
  }

  @Put(':id')
  async updateSubscriptionType(
    @Param('id') id: string,
    @Body() subscriptionType: { name: string },
  ) {
    const updatedSubscriptionType = await this.subscriptionTypeModel
      .findByIdAndUpdate(
        id,
        { $set: subscriptionType },
        { new: true, useFindAndModify: false },
      )
      .exec();

    return updatedSubscriptionType;
  }

  @Delete(':id')
  async deleteSubscriptionType(@Param('id') id: string) {
    if (id == null) throw new Error('Id is empty');
    await this.subscriptionTypeModel.findByIdAndDelete(id);

    return { _id: id };
  }
}
