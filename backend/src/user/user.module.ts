import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserDocument,
  UserSchema,
} from './infrastructure/database/schemas/user.schema';
import { MongooseUserRepository } from './infrastructure/database/repositories/mongoose-user.repository';
import { UserController, AuthController } from './adaper/controllers';
import { USER_REPOSITORY } from './domain/repositories/user.repository';
import { ExceptionsModule } from 'src/shared/infrastructure/exceptions/exceptions.module';
import { AuthenticationService } from './domain/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { EnvironmentConfigModule } from 'src/shared/infrastructure/config/environment-config/environment-config.module';
import { EnvironmentConfigService } from 'src/shared/infrastructure/config/environment-config/environment-config.service';
import { LocalStrategy } from './domain/common/strategies/local.strategy';
import { JwtRefreshTokenStrategy } from './domain/common/strategies/jwtRefresh.strategy';
import { JwtStrategy } from './domain/common/strategies/jwt.strategy';
import { GoogleStrategy } from './domain/common/strategies/google.strategy';
import UserCommandHandler from './application/commands';
import UserQueryHandler from './application/commands';
@Module({
  imports: [
    CqrsModule,
    JwtModule,
    EnvironmentConfigModule,
    ExceptionsModule,
    MongooseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
  ],
  controllers: [UserController, AuthController],
  providers: [
    { provide: USER_REPOSITORY, useClass: MongooseUserRepository },
    ...UserCommandHandler,
    ...UserQueryHandler,
    AuthenticationService,
    EnvironmentConfigService,
    LocalStrategy,
    JwtRefreshTokenStrategy,
    JwtStrategy,
    GoogleStrategy,
  ],
})
export class UserModule {}
