import { UpdateBlogDTO } from 'src/blog/adapter/dto/update-blog.dto';

export class CreateBlogCommandProps {
  userId: string;
  blog: UpdateBlogDTO;
}
export class CreateBlogCommand {
  constructor(public readonly props: CreateBlogCommandProps) {}
}
