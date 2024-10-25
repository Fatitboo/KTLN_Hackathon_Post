import { UserType } from 'src/user/domain/entities/user.entity';

export class RegisterUserCommandProps {
  password: string;
  email: string;
  fullname: string;
  confirm_password: string;
  userType: UserType;
}
export class RegisterUserCommand {
  constructor(public readonly props: RegisterUserCommandProps) {}
}
