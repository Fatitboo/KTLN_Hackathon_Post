import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateBlogCommand } from './create-blog.command';
import { Inject, NotFoundException } from '@nestjs/common';
import {
  BLOG_REPOSITORY,
  BlogRepository,
} from 'src/Blog/domain/repositories/Blog.repository';
import { Blog } from 'src/blog/domain/entities/blog.entity';

@CommandHandler(CreateBlogCommand)
export class CreateBlogHandler implements ICommandHandler<CreateBlogCommand> {
  constructor(
    @Inject(BLOG_REPOSITORY)
    private readonly blogRepository: BlogRepository,
  ) {}

  async execute(command: CreateBlogCommand) {
    const { userId, blog } = command.props;

    // Cập nhật các thuộc tính mới từ command
    const createBlog = new Blog(
      'id',
      blog.blogTitle,
      blog.blogType,
      blog.tagline,
      blog.content,
      blog.thumnailImage,
      blog.isApproval,
      blog.autho,
    );
    const result = await this.blogRepository.create(userId, createBlog);

    if (!result) {
      throw new NotFoundException(`Failed to create Blog.`);
    }

    return { data: result };
  }
}
