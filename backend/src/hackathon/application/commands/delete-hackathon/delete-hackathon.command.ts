export class DeleteHackathonCommandProps {
  id: string;
}

export class DeleteHackathonCommand {
  constructor(public readonly props: DeleteHackathonCommandProps) {}
}
