export class Project {
  constructor(
    public id: string,
    public projectNameId: string,
    public projectTitle: string,
    public tagline: string,
    public content: string,
    public thumnailImage: string,
    public builtWith: string[],
    public likedBy: string[],
    public createdByUsername: string[],
    public galary: GalaryItem[],
    public updates: UpdateItem[],
  ) {}
  setId(id: string) {
    this.id = id;
  }
  setProjectNameId(projectNameId: string) {
    this.projectNameId = projectNameId;
  }
}

export class GalaryItem {
  constructor(
    public url: string,
    public caption: string,
  ) {}
}

export class UpdateItem {
  constructor(
    public user: string,
    public update: string,
    public createdAt: string,
    public comments: CommentItem[],
  ) {}
}

export class CommentItem {
  constructor(
    public user: string,
    public comment: string,
    public createdAt: string,
  ) {}
}
