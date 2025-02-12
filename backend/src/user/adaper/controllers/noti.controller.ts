import { Controller, Get, UseGuards, Query, Request } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtAuthGuard } from 'src/user/domain/common/guards/jwtAuth.guard';
import { UserDocument } from 'src/user/infrastructure/database/schemas';

@Controller('notifications')
export class NotificationController {
  constructor(
    @InjectModel(UserDocument.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query('isRead') isRead: string, @Request() request: any) {
    const userId = request.user._props.id;
    const u = await this.userModel.findById(userId).populate({
      path: 'notifications',
      model: 'NotificationDocument',
    });
    if (isRead === '') {
      return u.notifications?.reverse() ?? [];
    } else {
      const isReadBoolean = isRead === 'true';
      return ((u.notifications as any[]) ?? [])?.filter(
        (item) => item.read === isReadBoolean,
      );
    }
  }
}
