import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterToHackathonCommand } from './register-to-hackathon.command';
import {
  USER_REPOSITORY,
  UserRepository,
} from '../../../domain/repositories/user.repository';
import { Inject } from '@nestjs/common';
import { ExceptionsService } from 'src/shared/infrastructure/exceptions/exceptions.service';

@CommandHandler(RegisterToHackathonCommand)
export class RegisterToHackathonHandler
  implements ICommandHandler<RegisterToHackathonCommand>
{
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    private readonly exceptionsService: ExceptionsService,
  ) {}

  async execute(command: RegisterToHackathonCommand) {
    const { userId, hackathonId, additionalInfo } = command.props;
    const rs = await this.userRepository.addUserRegisterToHackathon(
      userId,
      hackathonId,
      additionalInfo,
    );
    return rs;
  }
}
