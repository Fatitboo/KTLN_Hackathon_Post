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
import UserQueryHandler from './application/queries';
import { Auth2Service } from './adaper/services/auth2.service';
import { GithubStrategy } from './domain/common/strategies/github.strategy';
import {
  HackathonDocument,
  HackathonSchema,
} from 'src/hackathon/infrastructure/database/schemas';
import { HACKATHON_REPOSITORY } from 'src/hackathon/domain/repositories/hackathon.repository';
import { MongooseHackathonRepository } from 'src/hackathon/infrastructure/database/repositories/mongoose-hackathon.repository';
import {
  ProjectDocument,
  ProjectSchema,
} from 'src/project/infrastructure/database/schemas';
import { PROJECT_REPOSITORY } from 'src/project/domain/repositories/project.repository';
import { MongooseProjectRepository } from 'src/project/infrastructure/database/repositories/mongoose-project.repository';
@Module({
  imports: [
    CqrsModule,
    JwtModule,
    EnvironmentConfigModule,
    ExceptionsModule,
    MongooseModule.forFeature([
      { name: HackathonDocument.name, schema: HackathonSchema },
      { name: UserDocument.name, schema: UserSchema },
      { name: ProjectDocument.name, schema: ProjectSchema },
    ]),
  ],
  controllers: [UserController, AuthController],
  providers: [
    { provide: HACKATHON_REPOSITORY, useClass: MongooseHackathonRepository },
    { provide: USER_REPOSITORY, useClass: MongooseUserRepository },
    { provide: PROJECT_REPOSITORY, useClass: MongooseProjectRepository },
    ...UserCommandHandler,
    ...UserQueryHandler,
    AuthenticationService,
    EnvironmentConfigService,
    LocalStrategy,
    JwtRefreshTokenStrategy,
    GithubStrategy,
    JwtStrategy,
    GoogleStrategy,
    Auth2Service,
  ],
})
export class UserModule {}
