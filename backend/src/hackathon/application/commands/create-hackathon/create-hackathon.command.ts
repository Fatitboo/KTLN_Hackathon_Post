export class CreateHackathonCommandProps {
  userId: string;
}
export class CreateHackathonCommand {
  constructor(public readonly props: CreateHackathonCommandProps) {}
}
