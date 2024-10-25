import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  USER_REPOSITORY,
  UserRepository,
} from '../../../domain/repositories/user.repository';
import { User } from '../../../domain/entities/user.entity';
import { Inject } from '@nestjs/common';
import { ExceptionsService } from 'src/shared/infrastructure/exceptions/exceptions.service';
import { VerifyEmailCommand } from './verify-email.command';

@CommandHandler(VerifyEmailCommand)
export class VerifyEmailHandler implements ICommandHandler<VerifyEmailCommand> {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    private readonly exceptionsService: ExceptionsService,
  ) {}

  async execute(command: VerifyEmailCommand) {
    const { id } = command.props;

    if (!id) {
      this.exceptionsService.badRequestException({
        message: 'Can not find user id',
      });
    }

    const user = await this.userRepository.findById(id);
    if (!user) {
      this.exceptionsService.badRequestException({
        message: 'Not found user',
      });
    }
    await this.userRepository.updateById(id, { isVerify: true });
  }
}
