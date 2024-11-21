import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetBlogQuery } from './get-blog.query';
import { BlogRepository } from 'src/blog/domain/repositories/blog.repository';

@QueryHandler(GetBlogQuery)
export class GetBlogHandler implements IQueryHandler<GetBlogQuery> {
  constructor(
    @Inject('BlogRepository')
    private readonly blogRepository: BlogRepository,
  ) {}

  async execute(query: GetBlogQuery): Promise<any> {
    return await this.blogRepository.findById(query.id);
  }
}
