export class DeleteProjectCommandProps {
  id: string;
}

export class DeleteProjectCommand {
  constructor(public readonly props: DeleteProjectCommandProps) {}
}
