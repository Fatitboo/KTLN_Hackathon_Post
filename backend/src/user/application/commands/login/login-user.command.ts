import { UserType } from 'src/user/domain/entities/user.entity';

export class LoginUserCommandProps {
  email: string;
  password?: string;
  userType: UserType;
  fullname?: string;
  googleAccountId?: string;
  githubAccountId?: string;
  avatar?: string;
}
export class LoginUserCommand {
  constructor(public readonly props: LoginUserCommandProps) {}
}
