import { IsOptional, IsString } from 'class-validator';
import { UserType } from 'src/user/domain/entities/user.entity';
export class CreateUserDto {
  @IsString()
  password: string;

  @IsString()
  confirm_password: string;

  @IsString()
  email: string;

  @IsString()
  fullname: string;

  @IsString()
  userType: UserType;

  @IsOptional()
  googleAccountId: string;

  @IsOptional()
  githubAccountId: string;
}
