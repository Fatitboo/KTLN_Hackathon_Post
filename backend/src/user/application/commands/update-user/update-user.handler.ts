import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from './update-user.command';
import {
  USER_REPOSITORY,
  UserRepository,
} from '../../../domain/repositories/user.repository';
import { Inject } from '@nestjs/common';
import { ExceptionsService } from 'src/shared/infrastructure/exceptions/exceptions.service';
import { UserDocument } from 'src/user/infrastructure/database/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    private readonly exceptionsService: ExceptionsService,
    @InjectModel(UserDocument.name)
    private readonly userModel: Model<UserDocument>,
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
        const updatedUser = await this.userModel.findByIdAndUpdate(id, {
          settingRecommend: {
            ...command.props.settingRecommend,
          },
          isSetPersionalSetting: true,
        });
        return { settingRecommend: updatedUser.settingRecommend };
      case 'profile_user':
        const profileUpdatedUser = await this.userModel.findByIdAndUpdate(id, {
          fullname: command.props.fullname,
          bio: command.props.bio,
          linkedinLink: command.props.linkedinLink,
          facebookLink: command.props.facebookLink,
          githubLink: command.props.githubLink,
          address: command.props.address,
          dob: command.props.dob,
          isActive: command.props.isActive,
        });
        return {
          fullname: profileUpdatedUser.fullname,
          bio: profileUpdatedUser.bio,
          linkedinLink: profileUpdatedUser.linkedinLink,
          facebookLink: profileUpdatedUser.facebookLink,
          githubLink: profileUpdatedUser.githubLink,
          address: profileUpdatedUser.address,
          dob: profileUpdatedUser.dob,
        };
      case 'avatar':
        const avatarUpdatedUser = await this.userModel.findByIdAndUpdate(id, {
          avatar: command.props.avatar,
        });
        return {
          avatar: avatarUpdatedUser.avatar,
        };
      default:
        this.exceptionsService.badRequestException({
          message: 'Dont support this update',
        });
        break;
    }
  }
}
