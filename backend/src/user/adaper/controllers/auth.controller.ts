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
  HttpException,
  HttpStatus,
  Query,
  Put,
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
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/user/domain/repositories/user.repository';
import { Auth2Service } from '../services/auth2.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject(AuthenticationService)
    private readonly authenticationService: AuthenticationService,
    @Inject(Auth2Service)
    private readonly auth2Service: Auth2Service,
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
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
        googleAccountId: user.googleAccountId,
      }),
    );
    const { accessTokenCookie, refreshTokenCookie } =
      await this.getTokenUser(result);
    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
    return {
      ...result,
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
    return null;
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
      ...result,
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
    return null;
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
    return null;
  }

  @Post('/send-token-verify-by-email/:id')
  async sendTokenVerifyByEmail(@Param('id') id: string) {
    try {
      const token = await this.auth2Service.generateTokenVerifyAccount(id);
      return { message: 'Send email verify user successfully', token };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/send-token-reset-by-email')
  async sendTokenResetByEmail(@Query('email') email: string) {
    try {
      const token = await this.auth2Service.generateTokenResetPassword(email);
      return { message: 'Send email reset password user successfully', token };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('/update-token-verify')
  async updateVerifyAccount(@Query('token') token: string) {
    try {
      const user = await this.auth2Service.updateVerifyAccount(token);
      return { message: 'Verify account user successfully', userVerify: user };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('/update-token-reset')
  async updateResetPassword(
    @Query('token') token: string,
    @Query('newPassword') newPassword: string,
  ) {
    try {
      const user = await this.auth2Service.updateResetPassword(
        token,
        newPassword,
      );
      return { message: 'Reset password user successfully', userVerify: user };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('/update-password/:id')
  async updatePassword(
    @Param('id') id: string,
    @Query('oldPassword') oldPassword: string,
    @Query('newPassword') newPassword: string,
  ) {
    try {
      await this.auth2Service.updatePassword(id, oldPassword, newPassword);
      return { message: 'Change password user successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
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
