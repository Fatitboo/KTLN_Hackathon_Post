import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import {
  BLOG_REPOSITORY,
  BlogRepository,
} from 'src/Blog/domain/repositories/Blog.repository';
import { DeleteBlogCommand } from './delete-blog.command';

@CommandHandler(DeleteBlogCommand)
export class DeleteBlogHandler implements ICommandHandler<DeleteBlogCommand> {
  constructor(
    @Inject(BLOG_REPOSITORY)
    private readonly blogRepository: BlogRepository,
  ) {}

  async execute(command: DeleteBlogCommand) {
    const { id } = command.props;

    const hackObj = await this.blogRepository.findById(id);

    if (!hackObj) {
      throw new NotFoundException(`Blog with ID ${id} not found.`);
    }

    const message = await this.blogRepository.delete(id);

    return { data: message };
  }
}
