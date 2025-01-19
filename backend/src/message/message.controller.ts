import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { JwtAuthGuard } from 'src/user/domain/common/guards/jwtAuth.guard';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get(':chatId')
  async allMessages(@Param('chatId') chatId: string) {
    console.log('🚀 ~ MessageController ~ allMessages ~ chatId:', chatId);
    return this.messageService.allMessages(chatId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async sendMessage(
    @Body() body: { content: string; chatId: string },
    @Request() req: any,
  ) {
    return this.messageService.sendMessage(body, req.user._props.id);
  }
}
