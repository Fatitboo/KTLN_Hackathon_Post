export class RegisterUserCommandProps {
  password: string;
  email: string;
}
export class RegisterUserCommand {
  constructor(public readonly props: RegisterUserCommandProps) {}
}
