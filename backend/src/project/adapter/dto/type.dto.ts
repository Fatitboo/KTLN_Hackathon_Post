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
