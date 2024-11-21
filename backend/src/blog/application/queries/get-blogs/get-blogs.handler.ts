import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetBlogsQuery } from './get-blogs.query';
import { BlogRepository } from 'src/blog/domain/repositories/blog.repository';

@QueryHandler(GetBlogsQuery)
export class GetBlogsHandler implements IQueryHandler<GetBlogsQuery> {
  constructor(
    @Inject('BlogRepository')
    private readonly blogRepository: BlogRepository,
  ) {}

  async execute(query: GetBlogsQuery): Promise<any> {
    return await this.blogRepository.findAll(query.page);
  }
}
