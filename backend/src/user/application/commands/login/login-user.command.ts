export class LoginUserCommandProps {
  password: string;
  email: string;
}
export class LoginUserCommand {
  constructor(public readonly props: LoginUserCommandProps) {}
}
