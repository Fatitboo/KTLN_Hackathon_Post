import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  GetUserBy,
  GetUserDetailQuery,
  GetUserType,
} from './get-user-detail.query';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from 'src/user/infrastructure/database/schemas';
import { Model } from 'mongoose';

@QueryHandler(GetUserDetailQuery)
export class GetUserDetailQueryHandler
  implements IQueryHandler<GetUserDetailQuery>
{
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
    @InjectModel(UserDocument.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async execute(query: GetUserDetailQuery) {
    const { getBy, getType, id, email } = query.props;
    const condition = getBy === GetUserBy.ID ? { _id: id } : { email };
    const user = await this.userModel.findOne(condition).populate([
      {
        path: 'registerHackathons',
        model: 'HackathonDocument',
      },
      {
        path: 'projects',
        model: 'ProjectDocument',
        select: 'thumnailImage tagline projectTitle projectNameId _id',
      },
    ]);
    switch (getType) {
      case GetUserType.ALL:
        return user;
      case GetUserType.SETTING_RECOMMEND:
        return { settingRecommend: user.settingRecommend };

      case GetUserType.PROFILE_USER:
        return {
          email: user.email,
          avatar: user.avatar,
          fullname: user.fullname,
          bio: user.bio,
        };
      default:
        break;
    }
  }
}
