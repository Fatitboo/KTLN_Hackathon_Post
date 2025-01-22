import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { UserDocument } from 'src/user/infrastructure/database/schemas';
import { sendEmail } from 'src/user/domain/services/email.service';
import { templateHTML } from 'src/user/infrastructure/constants/template-email';
import * as jwt from 'jsonwebtoken';
import { urlFe } from 'src/main';

@Injectable()
export class Auth2Service {
  constructor(
    @InjectModel(UserDocument.name) private userModel: Model<UserDocument>,
  ) {}

  // Generate a random token
  public generateRandomToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  // Hash a token
  public hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  // Generate token for account verification
  async generateTokenVerifyAccount(id: string): Promise<string> {
    const user = await this.userModel.findById(id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const token = this.generateRandomToken();
    user.tokenVerify = this.hashToken(token);
    user.expiredDateTokenVerify = new Date(Date.now() + 10 * 60 * 1000); // 10 mins expiry
    await user.save();

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

  // Generate token for password reset
  async generateTokenResetPassword(email: string): Promise<string> {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const token = this.generateRandomToken();
    user.tokenResetPassword = this.hashToken(token);
    user.expiredDateTokenResetPassword = new Date(Date.now() + 10 * 60 * 1000); // 10 mins expiry
    await user.save();

    await sendEmail(
      user.email,
      templateHTML(
        'reset',
        `${urlFe}/user-auth/reset-password/${token}`,
        user.fullname,
      ),
      'Reset your password',
      'Reset your password',
    );
    return token;
  }

  // Verify account with token
  async updateVerifyAccount(token: string): Promise<UserDocument> {
    const hashedToken = this.hashToken(token);
    const user = await this.userModel.findOne({ tokenVerify: hashedToken });

    if (!user || new Date() > user.expiredDateTokenVerify)
      throw new HttpException(
        'Token expired or invalid',
        HttpStatus.BAD_REQUEST,
      );

    user.tokenVerify = null;
    user.isVerify = true;
    await user.save();
    return user;
  }

  // Reset password with token
  async updateResetPassword(
    token: string,
    password: string,
  ): Promise<UserDocument> {
    const hashedToken = this.hashToken(token);
    const user = await this.userModel.findOne({
      tokenResetPassword: hashedToken,
    });

    if (!user || new Date() > user.expiredDateTokenResetPassword)
      throw new HttpException(
        'Token expired or invalid',
        HttpStatus.BAD_REQUEST,
      );

    user.password = await bcrypt.hash(password, 10);
    user.tokenResetPassword = null;
    await user.save();
    return user;
  }

  // Update password
  async updatePassword(id: string, oldPassword: string, newPassword: string) {
    const user = await this.userModel.findById(id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      throw new HttpException('Old password incorrect', HttpStatus.BAD_REQUEST);

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
  }
  private readonly secretKey = 'saketqi4hrtq3478twqe';

  generateTokenInvite(params: any): string {
    const payload = { ...params };
    return jwt.sign(payload, this.secretKey, { expiresIn: '7d' }); // Token valid trong 7 ngày.
  }

  extractPayload(token: string) {
    return jwt.verify(token, this.secretKey);
  }
}
