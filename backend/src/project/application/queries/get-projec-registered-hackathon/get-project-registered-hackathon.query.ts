export class GetProjectRegisteredHackathonQueryProps {
  userId: string;
  hackathonId: string;
}

export class GetProjectRegisteredHackathonQuery {
  constructor(public readonly props: GetProjectRegisteredHackathonQueryProps) {}
}
