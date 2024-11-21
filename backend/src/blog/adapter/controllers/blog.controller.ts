import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Blog } from 'src/blog/domain/entities/blog.entity';
import { CreateBlogCommand } from 'src/blog/application/commands/create-blog/create-blog.command';
import { GetBlogQuery } from 'src/blog/application/queries/get-blog/get-blog.query';
import { UpdateBlogCommand } from 'src/blog/application/commands/update-blog/update-blog.command';
import { DeleteBlogCommand } from 'src/blog/application/commands/delete-blog/delete-blog.command';
import { GetBlogsQuery } from 'src/blog/application/queries/get-blogs/get-blogs.query';
import { UpdateBlogDTO } from '../dto/update-blog.dto';

@Controller('blogs')
export class BlogController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getAllBlogs(@Query('page') page: number) {
    return await this.queryBus.execute(new GetBlogsQuery(page));
  }

  @Get(':id')
  async getBlog(@Param('id') id: string) {
    return await this.queryBus.execute(new GetBlogQuery(id));
  }

  @Post(':userId')
  async createBlog(
    @Param('userId') userId: string,
    @Body() blog: UpdateBlogDTO,
  ): Promise<string> {
    const result = this.commandBus.execute(
      new CreateBlogCommand({ userId: userId, blog }),
    );

    return result;
  }

  @Put(':id')
  async updateBlog(
    @Param('id') id: string,
    @Body() blog: UpdateBlogDTO,
  ): Promise<Blog> {
    if (id == null) throw new Error('Id is empty');
    const result = this.commandBus.execute(
      new UpdateBlogCommand({ id: id, blog }),
    );

    return result;
  }

  @Delete(':id')
  async deleteBlog(@Param('id') id: string): Promise<string> {
    if (id == null) throw new Error('Id is empty');
    const result = this.commandBus.execute(new DeleteBlogCommand({ id: id }));

    return result;
  }
}
