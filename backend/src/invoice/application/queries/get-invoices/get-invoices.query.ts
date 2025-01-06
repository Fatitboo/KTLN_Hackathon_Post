export class GetInvoicesQuery {
  constructor(
    public readonly page: number | undefined,
    public readonly userId?: string | undefined,
  ) {}
}
