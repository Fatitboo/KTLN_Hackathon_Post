import { IsNotEmpty, IsString } from 'class-validator';
import { UserType } from 'src/user/domain/entities/user.entity';
export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  userType: UserType;
}
