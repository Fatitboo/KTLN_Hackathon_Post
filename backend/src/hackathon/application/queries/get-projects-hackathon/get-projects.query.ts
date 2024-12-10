export class GetProjectsQuery {
  constructor(
    public readonly id: string,
    public readonly type: string,
    public readonly page: number | undefined,
  ) {}
}
