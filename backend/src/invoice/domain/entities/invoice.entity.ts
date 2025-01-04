export class Invoice {
  constructor(
    public userId: string,

    public subscriptionId: string,

    public price?: string,

    public payType?: string,
  ) {}
}
