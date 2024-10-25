import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
export enum UserType {
  SEEKER = 'seeker',
  ORGANIZER = 'organizer',
  ADMIN = 'admin',
}

export interface UserProps {
  id?: string;
  password?: string;
  email: string;
  fullname: string;
  avatar?: string;
  hashRefreshToken?: string;
  userType: UserType[];
  googleAccountId?: string;
  githubAccountId?: string;
  isVerify?: boolean;
}
export class User {
  constructor(public _props: UserProps) {}

  setId(id?: string | undefined) {
    this._props.id = id;
  }
  setPassword(password?: string | undefined) {
    this._props.password = password;
  }
  public async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt(10);
    this._props.password = await bcrypt.hash(this._props.password, salt);
  }
  public async verifyPassword(plainTextPassword: string): Promise<void> {
    try {
      const isPasswordMatching = await bcrypt.compare(
        plainTextPassword,
        this._props.password,
      );
      if (!isPasswordMatching)
        throw new HttpException(
          'Wrong credentials provided',
          HttpStatus.BAD_REQUEST,
        );
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  public async verifyHashRefreshToken(plainTextToken: string): Promise<void> {
    const isRefreshTokenMatching = await bcrypt.compare(
      plainTextToken,
      this._props.hashRefreshToken,
    );
    if (!isRefreshTokenMatching)
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
  }
}
