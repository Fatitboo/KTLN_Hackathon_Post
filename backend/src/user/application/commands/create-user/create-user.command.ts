export class CreateUserCommandProps {
  username: string;
  password: string;
}
export class CreateUserCommand {
  constructor(public readonly props: CreateUserCommandProps) {}
}
