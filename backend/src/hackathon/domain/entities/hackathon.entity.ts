export class Hackathon {
  constructor(
    public id: string | undefined,
    public hackathonName: string,
  ) {}
  setId(id: string) {
    this.id = id;
  }
}
