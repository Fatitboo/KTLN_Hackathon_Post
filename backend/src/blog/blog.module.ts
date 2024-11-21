import { Module } from '@nestjs/common';
import { BlogController } from './adapter/controllers/blog.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogDocument, BlogSchema } from './infrastructure/database/schemas';
import { BLOG_REPOSITORY } from './domain/repositories/blog.repository';
import { MongooseBlogRepository } from './infrastructure/database/repositories/mongoose-blog.repository';
import { CreateBlogHandler } from './application/commands/create-blog/create-blog.handler';
import { GetBlogHandler } from './application/queries/get-blog/get-blog.handler';
import {
  UserDocument,
  UserSchema,
} from 'src/user/infrastructure/database/schemas';
import { GetBlogsHandler } from './application/queries/get-blogs/get-blogs.handler';
import { UpdateBlogHandler } from './application/commands/update-blog/update-blog.handler';
import { DeleteBlogHandler } from './application/commands/delete-blog/delete-blog.handler';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: BlogDocument.name, schema: BlogSchema },
      { name: UserDocument.name, schema: UserSchema },
    ]),
  ],
  controllers: [BlogController],
  providers: [
    { provide: BLOG_REPOSITORY, useClass: MongooseBlogRepository },
    GetBlogHandler,
    GetBlogsHandler,
    CreateBlogHandler,
    UpdateBlogHandler,
    DeleteBlogHandler,
  ],
})
export class BlogModule {}
