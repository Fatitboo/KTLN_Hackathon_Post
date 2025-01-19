import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { IActiveUser } from './socket.interface';
// import { ChatService } from '@/api/chat/chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor() {}
  // constructor(private readonly chatService: ChatService) {}

  private activeUsers: IActiveUser[] = [];
  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);

    const userId = (client.handshake.query.userId || '') as string;
    const newActiveUser: IActiveUser = {
      userId,
      clientId: client.id,
    };

    this.activeUsers.push(newActiveUser);

    console.log(this.activeUsers);
    this.server.emit(
      'activeUsers',
      this.activeUsers.map((item) => item.userId),
    );

    // const totalUnreadMessage = await this.countUnreadMessage(
    //   newActiveUser.userId,
    // );
    client.emit('totalUnreadMessage', 10);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.activeUsers = this.activeUsers.filter(
      (item) => item.clientId !== client.id,
    );
    this.server.emit(
      'activeUsers',
      this.activeUsers.map((item) => item.userId),
    );
  }

  @SubscribeMessage('setup')
  handleSetup(
    @MessageBody() userData: { _id: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(userData._id);
    client.emit('connected');
  }

  @SubscribeMessage('join chat')
  handleJoinChat(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(room);
    console.log('User Joined Room:', room);
  }

  @SubscribeMessage('typing')
  handleTyping(@MessageBody() room: string, @ConnectedSocket() client: Socket) {
    client.to(room).emit('typing');
  }

  @SubscribeMessage('stop typing')
  handleStopTyping(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.to(room).emit('stop typing');
  }

  @SubscribeMessage('new message')
  handleNewMessage(
    @MessageBody()
    newMessageRecieved: {
      sender: { _id: string };
      chat: { users: { _id: string }[] };
    },
    @ConnectedSocket() client: Socket,
  ) {
    const chat = newMessageRecieved.chat;

    if (!chat.users) {
      console.log('chat.users not defined');
      return;
    }
    console.log('🚀 ~ SocketGateway ~ chat.users:', chat.users);
    console.log('🚀 ~ SocketGateway ~ activeUsers:', this.activeUsers);
    chat.users.forEach((user) => {
      if (user._id === newMessageRecieved.sender._id) return;
      else client.to(user._id).emit('message recieved', newMessageRecieved);
    });
  }

  @SubscribeMessage('setup-disconnect')
  handleSetupDisconnect(
    @MessageBody() userData: { _id: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log('USER DISCONNECTED:', userData._id);
    client.leave(userData._id);
  }
}
