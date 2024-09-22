import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './shared/infrastructure/config/environment-config/environment-config.module';
import { DatabaseModule } from './shared/infrastructure/config/database/database.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ExceptionsModule } from './shared/infrastructure/exceptions/exceptions.module';
import { LoggerModule } from './shared/infrastructure/logger/logger.module';
import { UserModule } from './user/user.module';

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
