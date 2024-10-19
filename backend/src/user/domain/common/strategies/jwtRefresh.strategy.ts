import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { EnvironmentConfigService } from '../../../../shared/infrastructure/config/environment-config/environment-config.service';
import { ExceptionsService } from '../../../../shared/infrastructure/exceptions/exceptions.service';
import {
  USER_REPOSITORY,
  UserRepository,
} from '../../repositories/user.repository';
import { TokenPayload } from '../../services/auth.service';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private readonly configService: EnvironmentConfigService,
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    private readonly exceptionService: ExceptionsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Refresh;
        },
      ]),
      secretOrKey: configService.getJwtRefreshSecret(),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: TokenPayload) {
    const refreshToken = request.cookies?.Refresh;
    const user = await this.userRepository.findOne({ email: payload.email });
    if (!user) {
      this.exceptionService.UnauthorizedException({
        message: 'User not found or hash not correct',
      });
    }
    await user.verifyHashRefreshToken(refreshToken);

    return user;
  }
}
