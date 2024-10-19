import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
export class User {
  constructor(
    public id: string | undefined,
    public password: string,
    public email: string,
    public hashRefreshToken?: string,
  ) {}

  setId(id: string) {
    this.id = id;
  }

  public async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  public async verifyPassword(plainTextPassword: string): Promise<void> {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      this.password,
    );
    if (!isPasswordMatching)
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
  }
  public async verifyHashRefreshToken(plainTextToken: string): Promise<void> {
    const isRefreshTokenMatching = await bcrypt.compare(
      plainTextToken,
      this.hashRefreshToken,
    );
    if (!isRefreshTokenMatching)
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
  }
}
