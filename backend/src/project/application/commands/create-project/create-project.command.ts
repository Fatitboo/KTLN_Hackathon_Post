export class CreateProjectCommandProps {
  userId: string;
  title: string;
  hackathonId?: string;
  teamType?: string;
}
export class CreateProjectCommand {
  constructor(public readonly props: CreateProjectCommandProps) {}
}
