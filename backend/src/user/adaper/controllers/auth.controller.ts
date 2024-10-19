import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  Request,
  HttpCode,
  Inject,
  Get,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterUserCommand } from 'src/user/application/commands/register-user/register-user.command';
import { createUserDto } from '../dto/create-user.dto';
import { AuthenticationService } from 'src/user/domain/services/auth.service';
import { JwtAuthGuard } from 'src/user/domain/common/guards/jwtAuth.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { LoginGuard } from 'src/user/domain/common/guards/login.guard';
import JwtRefreshGuard from 'src/user/domain/common/guards/jwtRefresh.guard';
import { GoogleOAuthGuard } from 'src/user/domain/common/guards/google-oauth.guard';
import { LoginUserCommand } from 'src/user/application/commands/login/Login-user.command';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject(AuthenticationService)
    private readonly authenticationService: AuthenticationService,
  ) {}

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth() {}

  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Request() request: any) {
    const { user } = request;
    const result = await this.commandBus.execute(
      new LoginUserCommand({ password: user.password, email: user.email }),
    );
    const { accessTokenCookie, refreshTokenCookie } =
      await this.getTokenUser(result);
    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
    return {
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
        },
      },
    };
  }
  @HttpCode(201)
  @Post('register')
  async register(@Body() body: createUserDto): Promise<any> {
    const { password, email } = body;
    const result = await this.commandBus.execute(
      new RegisterUserCommand({ password, email }),
    );
    return {
      message: 'Register user successfully',
      data: result.data,
    };
  }

  @HttpCode(200)
  @Post('log-in')
  @ApiBearerAuth()
  @ApiOperation({ description: 'login' })
  async logIn(@Request() request: any): Promise<any> {
    const { user } = request;
    const result = await this.commandBus.execute(
      new LoginUserCommand({ password: user.password, email: user.email }),
    );
    const { accessTokenCookie, refreshTokenCookie } =
      await this.getTokenUser(result);
    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
    return {
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
        },
      },
    };
  }

  @HttpCode(200)
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'logout' })
  async logout(@Request() request: any) {
    const { user } = request;
    const cookie = this.authenticationService.getCookieForLogOut(user.id);
    request.res.setHeader('Set-Cookie', cookie);
    return {
      message: 'Logout successful',
      data: null,
    };
  }

  @Get('refresh')
  @UseGuards(JwtRefreshGuard)
  @ApiBearerAuth()
  async refresh(@Req() request: any) {
    const { user } = request;

    const { accessTokenCookie, refreshTokenCookie } =
      await this.getTokenUser(user);
    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
    return {
      message: 'Refresh successful',
      data: null,
    };
  }

  public async getTokenUser(user: any): Promise<{
    accessTokenCookie: string;
    refreshTokenCookie: string;
  }> {
    const accessTokenCookie = this.authenticationService.getCookieWithJwtToken(
      user.email,
      user.id,
    );
    const refreshTokenCookie =
      await this.authenticationService.getCookieWithJwtRefreshToken(
        user.email,
        user.id,
      );
    return { accessTokenCookie, refreshTokenCookie };
  }
}
