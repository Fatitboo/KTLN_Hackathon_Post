import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import {
  BLOG_REPOSITORY,
  BlogRepository,
} from 'src/Blog/domain/repositories/blog.repository';
import { UpdateBlogCommand } from './update-blog.command';
import { Blog } from 'src/blog/domain/entities/blog.entity';

@CommandHandler(UpdateBlogCommand)
export class UpdateBlogHandler implements ICommandHandler<UpdateBlogCommand> {
  constructor(
    @Inject(BLOG_REPOSITORY)
    private readonly blogRepository: BlogRepository,
  ) {}

  async execute(command: UpdateBlogCommand) {
    const { id, blog } = command.props;

    // Tìm kiếm Blog theo ID
    const existingBlog = await this.blogRepository.findById(id);
    if (!existingBlog) {
      throw new NotFoundException(`Blog with ID ${id} not found.`);
    }

    // Cập nhật các thuộc tính mới từ command
    const updatedBlog = new Blog(
      id,
      blog.blogTitle ?? existingBlog.blogTitle,
      blog.blogType ?? existingBlog.blogType,
      blog.tagline ?? existingBlog.tagline,
      blog.content ?? existingBlog.content,
      blog.thumnailImage ?? existingBlog.thumnailImage,
      blog.isApproval ?? existingBlog.isApproval,
      blog.autho ?? existingBlog.autho,
    );

    // Gọi repository để lưu lại cập nhật
    const result = await this.blogRepository.update(id, updatedBlog);

    if (!result) {
      throw new NotFoundException(`Failed to update Blog with ID ${id}.`);
    }

    return { data: result };
  }
}
