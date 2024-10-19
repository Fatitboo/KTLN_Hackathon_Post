import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginUserCommand } from './Login-user.command';
import {
  USER_REPOSITORY,
  UserRepository,
} from '../../../domain/repositories/user.repository';
import { User } from '../../../domain/entities/user.entity';
import { Inject } from '@nestjs/common';
import { ExceptionsService } from 'src/shared/infrastructure/exceptions/exceptions.service';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    private readonly exceptionsService: ExceptionsService,
  ) {}

  async execute(command: LoginUserCommand) {
    const { password, email } = command.props;

    if (!email || !password) {
      this.exceptionsService.UnauthorizedException();
    }
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      const newUser = new User(undefined, password, email);
      await newUser.hashPassword();

      return { data: await this.userRepository.save(newUser) };
    }

    user.verifyPassword(password);
    return { data: await this.userRepository.save(user) };
  }
}
