export class GetAllRegisterUsersQuery {
  constructor(
    public readonly id: string,
    public readonly page: number | undefined,
  ) {}
}
