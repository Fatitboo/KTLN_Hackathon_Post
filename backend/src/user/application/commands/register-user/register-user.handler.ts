import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from './register-user.command';
import {
  USER_REPOSITORY,
  UserRepository,
} from '../../../domain/repositories/user.repository';
import { User } from '../../../domain/entities/user.entity';
import { Inject } from '@nestjs/common';
import { ExceptionsService } from 'src/shared/infrastructure/exceptions/exceptions.service';
import { sendEmail } from 'src/user/domain/services/email.service';
import { templateHTML } from 'src/user/infrastructure/constants/template-email';
import baseServerUrl from 'src/user/infrastructure/constants/baseUrlBackend';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUserCommand>
{
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    private readonly exceptionsService: ExceptionsService,
  ) {}

  async execute(command: RegisterUserCommand) {
    const { email, confirm_password, password } = command.props;
    if (confirm_password !== password) {
      this.exceptionsService.badRequestException({
        message: 'Password and password confirm is not match',
      });
    }
    const isEmailExist = await this.userRepository.findOne({ email });
    if (isEmailExist) {
      this.exceptionsService.badRequestException({
        message: 'Email already exists',
      });
    }

    const user = new User({
      ...command.props,
      isVerify: false,
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/englishvoc-43d5a.appspot.com/o/images%2FavatarDefault.png?alt=media&token=59aae8c1-2129-46ca-ad75-5dad1b119188',
      userType: [command.props.userType],
    });

    await user.hashPassword();
    const newUser = await this.userRepository.create(user);
    await sendEmail(
      email,
      templateHTML(
        'verify',
        `${baseServerUrl}/api/v1/auth/verify-email/${newUser._props.id}`,
        command.props.fullname,
      ),
      'Verify your email',
      'Please verify your email',
    );
  }
}
