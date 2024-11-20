export class CreateProjectCommandProps {
  userId: string;
  title: string;
}
export class CreateProjectCommand {
  constructor(public readonly props: CreateProjectCommandProps) {}
}
