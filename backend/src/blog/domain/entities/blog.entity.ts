import { AuthoBlog } from 'src/blog/infrastructure/database/schemas';

export class Blog {
  constructor(
    public id: string,
    public blogTitle: string,
    public blogType: string,
    public tagline: string,
    public content: string,
    public thumnailImage: string,
    public isApproval: boolean,
    public autho: AuthoBlog,
  ) {}
  setId(id: string) {
    this.id = id;
  }
}
