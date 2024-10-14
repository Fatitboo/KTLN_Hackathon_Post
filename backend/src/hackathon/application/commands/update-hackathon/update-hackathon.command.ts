import { UpdateHackathonDTO } from 'src/hackathon/adapter/dto/update-hackathon.dto';

export class UpdateHackathonCommandProps {
  id: string;
  hackathon: UpdateHackathonDTO;
}

export class UpdateHackathonCommand {
  constructor(public readonly props: UpdateHackathonCommandProps) {}
}
