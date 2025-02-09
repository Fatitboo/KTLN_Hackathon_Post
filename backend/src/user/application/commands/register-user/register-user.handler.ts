import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from './register-user.command';
import {
  USER_REPOSITORY,
  UserRepository,
} from '../../../domain/repositories/user.repository';
import { User } from '../../../domain/entities/user.entity';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ExceptionsService } from 'src/shared/infrastructure/exceptions/exceptions.service';
import { sendEmail } from 'src/user/domain/services/email.service';
import { templateHTML } from 'src/user/infrastructure/constants/template-email';
import { Auth2Service } from 'src/user/adaper/services/auth2.service';
import { UserDocument } from 'src/user/infrastructure/database/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InteractionDocument } from 'src/hackathon/infrastructure/database/schemas/interaction.schema';
import { urlFe } from 'src/main';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUserCommand>
{
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    private readonly exceptionsService: ExceptionsService,
    @Inject(Auth2Service)
    private readonly auth2Service: Auth2Service,
    @InjectModel(UserDocument.name) private userModel: Model<UserDocument>,
    @InjectModel(InteractionDocument.name)
    private interactionModel: Model<InteractionDocument>,
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

    const createUser = new User({
      ...command.props,
      isVerify: false,
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/englishvoc-43d5a.appspot.com/o/images%2FavatarDefault.png?alt=media&token=59aae8c1-2129-46ca-ad75-5dad1b119188',
      userType: [command.props.userType],
    });

    await createUser.hashPassword();
    await this.userRepository.create(createUser);

    const user = await this.userModel.findOne({ email });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const token = this.auth2Service.generateRandomToken();
    user.tokenVerify = this.auth2Service.hashToken(token);
    user.expiredDateTokenVerify = new Date(Date.now() + 10 * 60 * 1000); // 10 mins expiry
    await user.save();
    await this.interactionModel.create({
      user_id: user._id,
      hackathon: '67386091dc5db4aea4e96603',
      hackathon_id: 30000,
      interaction_type: 'view',
    });
    // await axios.post('http://localhost:5001/update-data');
    await sendEmail(
      user.email,
      templateHTML(
        'verify',
        `${urlFe}/user-auth/verify-account/${token}`,
        user.fullname,
      ),
      'Verify your email',
      'Please verify your email',
    );
    return token;
  }
}
