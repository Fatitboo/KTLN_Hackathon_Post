import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from './register-user.command';
import {
  USER_REPOSITORY,
  UserRepository,
} from '../../../domain/repositories/user.repository';
import { User } from '../../../domain/entities/user.entity';
import { Inject } from '@nestjs/common';
import { ExceptionsService } from 'src/shared/infrastructure/exceptions/exceptions.service';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUserCommand>
{
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    private readonly exceptionsService: ExceptionsService,
  ) {}

  async execute(command: RegisterUserCommand) {
    const { password, email } = command.props;
    const isEmailExist = await this.userRepository.findOne({ email });
    if (isEmailExist) {
      this.exceptionsService.badRequestException({
        message: 'Email already exists',
      });
    }

    const user = new User(new Date().getTime().toString(), password, email);
    await user.hashPassword();

    return { data: await this.userRepository.save(user) };
  }
}
