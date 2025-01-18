export class GetHackathonsQuery {
  constructor(
    public readonly userId: string,
    public readonly page: number | undefined,
  ) {}
}
