import { Prop } from '@nestjs/mongoose';
import { IsOptional, IsString } from 'class-validator';

export class GalaryItem {
  @Prop()
  @IsString()
  url: string;

  @Prop()
  @IsOptional()
  caption: string;
}

export class CommentItem {
  @Prop()
  @IsString()
  user: string;

  @Prop()
  @IsOptional()
  comment: string;

  @Prop()
  createdAt: string;
}

export class UpdateItem {
  @Prop()
  @IsString()
  user: string;

  @Prop()
  @IsString()
  @IsOptional()
  update: string;

  @Prop()
  createdAt: string;

  @Prop()
  comments: CommentItem[];
}
