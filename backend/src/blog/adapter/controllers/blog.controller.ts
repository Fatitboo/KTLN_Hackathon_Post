import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UpdateBlogDTO } from '../dto/update-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BlogDocument } from 'src/blog/infrastructure/database/schemas';
import { Model } from 'mongoose';
import { UserDocument } from 'src/user/infrastructure/database/schemas';

@Controller('blogs')
export class BlogController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @InjectModel(BlogDocument.name)
    private readonly blogModel: Model<BlogDocument>,

    @InjectModel(UserDocument.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  @Get()
  async getAllBlogs(@Query('page') page: number) {
    const blogs = await this.blogModel.find().lean().exec();
    if (!blogs) return [];
    return blogs;
  }

  @Get(':id')
  async getBlog(@Param('id') id: string) {
    const blog = await this.blogModel.findById(id).lean().exec();
    if (!blog) return null;
    return blog;
  }

  @Post(':userId')
  async createBlog(
    @Param('userId') userId: string,
    @Body() blog: UpdateBlogDTO,
  ) {
    const existingUser = await this.userModel.findById(userId);

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    const createBlog = new this.blogModel({
      blogTitle: blog.blogTitle,
      tagline: blog.tagline,
      content: blog.content,
      thumnailImage: blog.thumnailImage,
      autho: blog.autho,
      isApproval: blog.isApproval,
      blogType: blog.blogType,
      owner: existingUser._id,
    });

    const blogObj = await createBlog.save();

    existingUser.blogs.push(blogObj._id);
    await existingUser.save();

    return blogObj;
  }

  @Put(':id')
  async updateBlog(@Param('id') id: string, @Body() blog: UpdateBlogDTO) {
    const updatedBlog = await this.blogModel
      .findByIdAndUpdate(
        id,
        { $set: blog },
        { new: true, useFindAndModify: false },
      )
      .exec();

    if (!updatedBlog) {
      throw new NotFoundException(`Blog with ID ${id} not found.`);
    }

    return updatedBlog;
  }

  @Delete(':id')
  async deleteBlog(@Param('id') id: string): Promise<string> {
    const existingBlog = await this.blogModel.findById(id);

    if (!existingBlog) {
      throw new NotFoundException(`Blog with ID ${id} not found.`);
    }

    await this.blogModel.findByIdAndDelete(id);

    return 'Delete successfully';
  }
}
