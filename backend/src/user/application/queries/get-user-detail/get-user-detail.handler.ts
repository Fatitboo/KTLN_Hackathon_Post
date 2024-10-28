import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  GetUserBy,
  GetUserDetailQuery,
  GetUserType,
} from './get-user-detail.query';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { User } from '../../../domain/entities/user.entity';
import { Inject } from '@nestjs/common';

@QueryHandler(GetUserDetailQuery)
export class GetUserHandler implements IQueryHandler<GetUserDetailQuery> {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async execute(query: GetUserDetailQuery) {
    const { getBy, getType, id, email } = query.props;
    const condition = getBy === GetUserBy.ID ? { _id: id } : { email };
    const user = await this.userRepository.findOne(condition);
    switch (getType) {
      case GetUserType.ALL:
        return { user };
      case GetUserType.SETTING_RECOMMEND:
        return { settingRecommend: user._props.settingRecommend };
      case GetUserType.PROFILE_USER:
        return {
          fullname: user._props.fullname,
          bio: user._props.bio,
          socialLinks: user._props.socialLinks,
        };
      default:
        break;
    }
    // return await this.userRepository.findById(query.id);
  }
}
