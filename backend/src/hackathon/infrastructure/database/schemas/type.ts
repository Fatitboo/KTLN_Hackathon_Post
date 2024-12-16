import { Prop } from '@nestjs/mongoose';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Date } from 'mongoose';

export class Range {
  @Prop({ required: true })
  @IsNumber()
  min: number;

  @Prop()
  @IsOptional()
  @IsNumber()
  max: number;

  @Prop({ default: 'Range' })
  type: string;
}

export class TeamRange extends Range {
  @Prop({ required: true })
  isRequire: boolean;
}

export class Task {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  @IsString()
  label: string;

  @Prop({ required: true })
  @IsString()
  url: string;
}

export class Submission {
  @Prop({ required: true, type: Date })
  start: Date;

  @Prop({ required: true, type: Date })
  deadline: Date;

  @Prop({ required: true })
  @IsString()
  note: string;

  @Prop({ required: true })
  @IsBoolean()
  isUploadFile: boolean;

  @Prop({ required: true })
  @IsBoolean()
  isUploadVideo: boolean;
}

export class DateRange {
  @Prop({ type: Date })
  @IsNumber()
  start: Date;

  @Prop({ type: Date })
  end: Date;
}

export class Judges {
  @Prop()
  @IsString()
  fullName: string;

  @Prop()
  @IsString()
  email: string;

  @Prop()
  @IsString()
  title: string;

  @Prop()
  @IsString()
  photo: string;
}

export class Criteria {
  @Prop()
  @IsString()
  title: string;

  @Prop()
  @IsString()
  description: string;
}

export class Prize {
  @Prop()
  @IsString()
  prizeName: string;

  @Prop()
  @IsString()
  cashValue: string;

  @Prop()
  @IsString()
  description: string;

  @Prop()
  @IsString()
  numberWinningProject: number;
}
