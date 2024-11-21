import { UpdateProjectDTO } from 'src/project/adapter/dto/update-project.dto';

export class UpdateProjectCommandProps {
  id: string;
  project: UpdateProjectDTO;
}

export class UpdateProjectCommand {
  constructor(public readonly props: UpdateProjectCommandProps) {}
}
