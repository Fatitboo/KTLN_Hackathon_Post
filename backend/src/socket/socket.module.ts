import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
// import { ChatModule } from '@/api/chat/chat.module';

@Module({
  imports: [],
  providers: [SocketService, SocketGateway],
  exports: [SocketGateway],
})
export class SocketModule {}
