import { InjectModel } from '@nestjs/mongoose';
import { BlogDocument } from '../schemas';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { UserDocument } from 'src/user/infrastructure/database/schemas';
import { Blog } from 'src/Blog/domain/entities/Blog.entity';
import { BlogRepository } from 'src/blog/domain/repositories/blog.repository';

export class MongooseBlogRepository implements BlogRepository {
  constructor(
    @InjectModel(BlogDocument.name)
    private readonly blogModel: Model<BlogDocument>,

    @InjectModel(UserDocument.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findAll(page: number): Promise<BlogDocument[]> {
    const blogs = await this.blogModel.find().lean().exec();
    if (!blogs) return [];
    return blogs;
  }

  async findById(id: string): Promise<BlogDocument | null> {
    const blog = await this.blogModel.findById(id).lean().exec();
    if (!blog) return null;
    return blog;
  }

  async create(userId: string, blog: Blog): Promise<BlogDocument | null> {
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
      owner: userId,
    });

    const blogObj = await createBlog.save();

    existingUser.blogs.push(blogObj._id);
    await existingUser.save();

    return blogObj;
  }

  async update(id: string, blog: Blog): Promise<BlogDocument> {
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

  async delete(id: string): Promise<string> {
    const existingBlog = await this.blogModel.findById(id);

    if (!existingBlog) {
      throw new NotFoundException(`Blog with ID ${id} not found.`);
    }

    await this.blogModel.findByIdAndDelete(id);

    return 'Delete successfully';
  }
}
