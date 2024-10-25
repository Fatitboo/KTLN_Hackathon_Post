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
  Param,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterUserCommand } from 'src/user/application/commands/register-user/register-user.command';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthenticationService } from 'src/user/domain/services/auth.service';
import { JwtAuthGuard } from 'src/user/domain/common/guards/jwtAuth.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import JwtRefreshGuard from 'src/user/domain/common/guards/jwtRefresh.guard';
import { GoogleOAuthGuard } from 'src/user/domain/common/guards/google-oauth.guard';
import { LoginUserCommand } from 'src/user/application/commands/login/Login-user.command';
import { LoginUserDto } from '../dto/login-user.dto';
import { UserType } from 'src/user/domain/entities/user.entity';
import { VerifyEmailCommand } from 'src/user/application/commands/verify-email/verify-email.command';

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
      new LoginUserCommand({
        password: user.password,
        email: user.email,
        fullname: user.fullname,
        userType: UserType.SEEKER,
        avatar: user.avatar,
      }),
    );
    const { accessTokenCookie, refreshTokenCookie } =
      await this.getTokenUser(result);
    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
    return {
      message: 'Login successfully',
      data: {
        ...result,
      },
    };
  }
  @HttpCode(201)
  @Post('register')
  async register(@Body() body: CreateUserDto): Promise<any> {
    await this.commandBus.execute(
      new RegisterUserCommand({
        ...body,
      }),
    );
    return {
      message: 'Register user successfully',
      data: null,
    };
  }

  @HttpCode(200)
  @Post('log-in')
  @ApiBearerAuth()
  @ApiOperation({ description: 'login' })
  async logIn(
    @Request() request: any,
    @Body() body: LoginUserDto,
  ): Promise<any> {
    const result = await this.commandBus.execute(
      new LoginUserCommand({ ...body }),
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
        ...result,
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

  @Get('verify-email/:id')
  @ApiBearerAuth()
  async verifyEmail(@Req() request: any, @Param('id') id: string) {
    await this.commandBus.execute(new VerifyEmailCommand({ id }));
    return {
      message: 'Verify email successfully',
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
