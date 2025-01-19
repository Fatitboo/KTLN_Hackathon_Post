import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './shared/infrastructure/config/environment-config/environment-config.module';
import { DatabaseModule } from './shared/infrastructure/config/database/database.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ExceptionsModule } from './shared/infrastructure/exceptions/exceptions.module';
import { LoggerModule } from './shared/infrastructure/logger/logger.module';
import { UserModule } from './user/user.module';
import { HackathonModule } from './hackathon/hackathon.module';
import { BlogModule } from './blog/blog.module';
import { ProjectModule } from './project/project.module';
import { InvoiceModule } from './invoice/invoice.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { SubscriptionTypeModule } from './subscription_type/subscription-type.module';
import { SocketModule } from './socket/socket.module';
import { MessageModule } from './message/message.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    EnvironmentConfigModule,
    DatabaseModule,
    ExceptionsModule,
    LoggerModule,
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 100,
        limit: 5,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
    UserModule,
    HackathonModule,
    SocketModule,
    BlogModule,
    ProjectModule,
    InvoiceModule,
    SubscriptionModule,
    SubscriptionTypeModule,
    MessageModule,
    ChatModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
