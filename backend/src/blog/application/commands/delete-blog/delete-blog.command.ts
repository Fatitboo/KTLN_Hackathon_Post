export class DeleteBlogCommandProps {
  id: string;
}

export class DeleteBlogCommand {
  constructor(public readonly props: DeleteBlogCommandProps) {}
}
