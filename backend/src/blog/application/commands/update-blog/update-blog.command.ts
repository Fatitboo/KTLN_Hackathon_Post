import { UpdateBlogDTO } from 'src/blog/adapter/dto/update-blog.dto';

export class UpdateBlogCommandProps {
  id: string;
  blog: UpdateBlogDTO;
}

export class UpdateBlogCommand {
  constructor(public readonly props: UpdateBlogCommandProps) {}
}
