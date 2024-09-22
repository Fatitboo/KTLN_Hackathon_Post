import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserDocument,
  UserSchema,
} from './infrastructure/database/schemas/user.schema';
import { MongooseUserRepository } from './infrastructure/database/repositories/mongoose-user.repository';
import { UserController } from './adaper/controllers/user.controller';
import { CreateUserHandler } from './application/commands/create-user/create-user.handler';
import { GetUserHandler } from './application/queries/get-user/get-user.handler';
import { USER_REPOSITORY } from './domain/repositories/user.repository';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [
    { provide: USER_REPOSITORY, useClass: MongooseUserRepository },
    CreateUserHandler,
    GetUserHandler,
  ],
})
export class UserModule {}
