export class CreateHackathonCommandProps {
  hackathonName: string;
}

export class CreateHackathonCommand {
  constructor(public readonly props: CreateHackathonCommandProps) {}
}
