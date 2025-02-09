import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from 'src/user/domain/common/guards/jwtAuth.guard';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async accessChat(@Body() body: { userId: string }, @Request() request: any) {
    return this.chatService.accessChat(body, request.user._props.id);
  }

  @Post('hackathon')
  @UseGuards(JwtAuthGuard)
  async accessChatHackathon(
    @Body() body: { hackathonId: string },
    @Request() request: any,
  ) {
    return this.chatService.accessChatHacakthon(
      body.hackathonId,
      request.user._props.id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async fetchChats(@Request() request: any) {
    return this.chatService.fetchChats(request.user._props.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('group')
  async createGroupChat(
    @Body() body: { users: string[]; name: string },
    @Request() request: any,
  ) {
    return this.chatService.createGroupChat(body, request.user._props.id);
  }

  @Put('rename')
  async renameGroup(@Body() body: { chatId: string; chatName: string }) {
    return this.chatService.renameGroup(body.chatId, body.chatName);
  }

  @Put('groupremove')
  async removeFromGroup(@Body() body: { chatId: string; userId: string }) {
    return this.chatService.removeFromGroup(body.chatId, body.userId);
  }

  @Put('groupadd')
  async addToGroup(@Body() body: { chatId: string; userId: string }) {
    return this.chatService.addToGroup(body.chatId, body.userId);
  }
}
