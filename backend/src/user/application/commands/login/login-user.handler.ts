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
    const { password, email, userType, googleAccountId, githubAccountId } =
      command.props;

    if (!email) {
      this.exceptionsService.UnauthorizedException({
        message: 'Not found user',
      });
    }

    const user = await this.userRepository.findOne({ email });
    if (!googleAccountId || !githubAccountId) {
      if (!user) {
        this.exceptionsService.UnauthorizedException({
          message: 'Not found user',
        });
      }
    }
    if (!user) {
      const newUser = new User({
        ...command.props,
        password: '12345678',
        isVerify: true,
        fullname: command.props.fullname,
        userType: [userType],
      });
      await newUser.hashPassword();

      return { user: await this.userRepository.create(newUser) };
    }
    try {
      await user.verifyPassword(password);
    } catch (error) {
      this.exceptionsService.UnauthorizedException({
        message: 'Email or password is not correct',
      });
    }
    const userTypes = user._props.userType;
    if (!userTypes.includes(userType)) {
      this.exceptionsService.UnauthorizedException({
        message: 'You dont have permission to access',
      });
    }

    return {
      user: {
        id: user._props.id,
        email: user._props.email,
        avatar: user._props.avatar,
        fullname: user._props.fullname,
        userType: user._props.userType,
        isVerify: user._props.isVerify,
        isActive: user._props.isActive,
      },
    };
  }
}
