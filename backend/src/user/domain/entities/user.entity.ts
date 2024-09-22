export class User {
  constructor(
    public id: string | undefined,
    public username: string,
    public password: string,
  ) {}

  setId(id: string) {
    this.id = id;
  }
}
