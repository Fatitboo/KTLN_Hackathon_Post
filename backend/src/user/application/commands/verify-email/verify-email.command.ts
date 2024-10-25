export class VerifyEmailCommandProps {
  id: string;
}
export class VerifyEmailCommand {
  constructor(public readonly props: VerifyEmailCommandProps) {}
}
