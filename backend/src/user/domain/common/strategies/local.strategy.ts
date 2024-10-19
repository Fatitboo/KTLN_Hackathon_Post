import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { ExceptionsService } from '../../../../shared/infrastructure/exceptions/exceptions.service';
import {
  USER_REPOSITORY,
  UserRepository,
} from '../../repositories/user.repository';
import { User } from '../../entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    private readonly exceptionService: ExceptionsService,
  ) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    if (!email || !password) {
      this.exceptionService.UnauthorizedException();
    }
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      this.exceptionService.UnauthorizedException({
        message: 'Invalid username or password.',
      });
    }
    user.verifyPassword(password);
    return user;
  }
}
