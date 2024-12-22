export class GetHackathonQuery {
  constructor(
    public readonly id: string,
    public readonly userId?: string | undefined,
  ) {}
}
