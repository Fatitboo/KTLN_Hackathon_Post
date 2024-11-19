import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  USER_REPOSITORY,
  UserRepository,
} from '../repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { EnvironmentConfigService } from 'src/shared/infrastructure/config/environment-config/environment-config.service';

export interface TokenPayload {
  email: string;
  userId: string;
}

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    @Inject(EnvironmentConfigService)
    private readonly jwtConfig: EnvironmentConfigService,
  ) {}

  public getCookieWithJwtToken(email: string, userId: string) {
    const payload: TokenPayload = { email, userId };
    const secret = this.jwtConfig.getJwtSecret();
    const expiresIn = this.jwtConfig.getJwtExpirationTime() + 's';
    const token = this.jwtService.sign(payload, { secret, expiresIn });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtExpirationTime()};`;
  }

  public async getCookieWithJwtRefreshToken(email: string, userId: string) {
    const payload: TokenPayload = { email, userId };
    const secret = this.jwtConfig.getJwtRefreshSecret();
    const expiresIn = this.jwtConfig.getJwtRefreshExpirationTime() + 's';
    const token = this.jwtService.sign(payload, { secret, expiresIn });
    await this.userRepository.updateById(userId, {
      hashRefreshToken: await bcrypt.hash(token, 10),
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtRefreshExpirationTime()};`;
    return cookie;
  }

  public async getCookieForLogOut(userId: string) {
    await this.userRepository.updateById(userId, {
      hashRefreshToken: undefined,
    });
    return [
      `Authentication=; HttpOnly; Path=/; Max-Age=0`,
      `Refresh=; HttpOnly; Path=/; Max-Age=0`,
    ];
  }
}
