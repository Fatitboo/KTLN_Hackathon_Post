import { UpdateHackathonDTO } from 'src/hackathon/adapter/dto/update-hackathon.dto';

export class AwardHackathonCommandProps {
  hackathonId: string;
  hackathon: UpdateHackathonDTO;
}
export class AwardHackathonCommand {
  constructor(public readonly props: AwardHackathonCommandProps) {}
}
