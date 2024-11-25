export class CreateProjectCommandProps {
  userId: string;
  title: string;
  hackathonId?: string;
}
export class CreateProjectCommand {
  constructor(public readonly props: CreateProjectCommandProps) {}
}
