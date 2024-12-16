export class DeleteHackathonCommandProps {
  userId: string;
  id: string;
}

export class DeleteHackathonCommand {
  constructor(public readonly props: DeleteHackathonCommandProps) {}
}
