import { IsString } from 'class-validator';
export class createUserDto {
  @IsString()
  password: string;

  @IsString()
  email: string;
}
