import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import baseServerUrl from 'src/user/infrastructure/constants/baseUrlBackend';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${baseServerUrl}/api/v1/auth/github/callback`,
      scope: ['user:email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    console.log('🚀 ~ GithubStrategy ~ validate ~ accessToken:', accessToken);
    // Xử lý thông tin profile từ GitHub và trả về user
    return { ...profile, accessToken };
  }
}
