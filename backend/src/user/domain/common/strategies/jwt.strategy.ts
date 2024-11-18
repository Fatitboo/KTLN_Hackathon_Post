import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { ExceptionsService } from '../../../../shared/infrastructure/exceptions/exceptions.service';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/user/domain/repositories/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly exceptionService: ExceptionsService,
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          if (!request?.cookies?.Authentication) {
            throw new UnauthorizedException('NotFoundAuthentication');
          } //TokenExpiredError
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.userRepository.findOne({ email: payload.email });
    if (!user) {
      this.exceptionService.UnauthorizedException({
        message: 'User not found',
      });
    }
    return user;
  }
}
