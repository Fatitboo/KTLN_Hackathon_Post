export class RegisterToHackathonCommandProps {
  userId: string;
  hackathonId: string;
  additionalInfo: any;
}
export class RegisterToHackathonCommand {
  constructor(public readonly props: RegisterToHackathonCommandProps) {}
}
