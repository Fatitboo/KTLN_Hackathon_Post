import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from './update-user.command';
import {
  USER_REPOSITORY,
  UserRepository,
} from '../../../domain/repositories/user.repository';
import { Inject } from '@nestjs/common';
import { ExceptionsService } from 'src/shared/infrastructure/exceptions/exceptions.service';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    private readonly exceptionsService: ExceptionsService,
  ) {}

  async execute(command: UpdateUserCommand) {
    const { updateType, id } = command.props;
    const user = await this.userRepository.findById(id);
    if (!user)
      this.exceptionsService.UnauthorizedException({
        message: 'Not found user',
      });

    switch (updateType) {
      case 'setting_recommend':
        const updatedUser = await this.userRepository.updateById(id, {
          settingRecommend: {
            ...command.props.settingRecommend,
          },
          isSetPersionalSetting: true,
        });
        return { settingRecommend: updatedUser._props.settingRecommend };
      case 'profile_user':
        const profileUpdatedUser = await this.userRepository.updateById(id, {
          fullname: command.props.fullname,
          bio: command.props.bio,
          socialLinks: command.props.socialLinks,
        });
        return {
          fullname: profileUpdatedUser._props.fullname,
          bio: profileUpdatedUser._props.bio,
          socialLinks: profileUpdatedUser._props.socialLinks,
        };
      case 'avatar':
        const avatarUpdatedUser = await this.userRepository.updateById(id, {
          avatar: command.props.avatar,
        });
        return {
          avatar: avatarUpdatedUser._props.avatar,
        };
      default:
        this.exceptionsService.badRequestException({
          message: 'Dont support this update',
        });
        break;
    }
  }
}
