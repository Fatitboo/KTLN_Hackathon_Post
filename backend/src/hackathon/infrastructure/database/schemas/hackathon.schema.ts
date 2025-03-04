import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import {
  Criteria,
  DateRange,
  Judges,
  Prize,
  Range,
  Submission,
  Task,
  TeamRange,
} from './type';
export enum TEAM_STATUS {
  HAD_TEAM = 'had_team',
  WORKING_SOLO = 'working_solo',
  FINDING_TEAMATE = 'finding_teamate',
  BLOCK = 'block',
}

export class RegisterUser {
  @Prop({ type: [{ type: Types.ObjectId, ref: 'UserDocument' }] })
  userId: Types.ObjectId;

  @Prop({ type: String, enum: TEAM_STATUS, required: true })
  status: TEAM_STATUS;
}

export class Discussion {
  @Prop({ type: [{ type: Types.ObjectId, ref: 'UserDocument' }] })
  userId: Types.ObjectId;

  @Prop()
  discussionId: string;

  @Prop()
  userName: string;

  @Prop()
  avatar: string;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  createdAt: string;

  @Prop()
  comments: Comment[];
}
export class Comment {
  @Prop({ type: [{ type: Types.ObjectId, ref: 'UserDocument' }] })
  userId: Types.ObjectId;

  @Prop()
  commentId: string;

  @Prop()
  userName: string;

  @Prop()
  avatar: string;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  createdAt: string;
}

export class UpdateNew {
  @Prop()
  updateId: string;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  createdAt: string;
}
@Schema({
  timestamps: {
    createdAt: 'create_at',
    updatedAt: 'update_at',
  },
  collection: 'Hackathons',
})
export class HackathonDocument {
  @Prop()
  hackathonName: string;

  @Prop()
  tagline: string;

  @Prop()
  hackathonIntegrateId: number;

  @Prop()
  managerMail: string;

  @Prop()
  hostName: string;

  @Prop({ type: [String] })
  hackathonTypes: string[];

  @Prop({ type: [RegisterUser], default: [] })
  registerUsers: RegisterUser[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'ProjectDocument' }] })
  submitions: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'ProjectDocument' }] })
  registedTeams: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'ReportDocument' }] })
  reports: Types.ObjectId[];

  @Prop()
  applyFor: string;

  @Prop()
  isPublished: boolean;

  @Prop({ type: Range })
  participantAge: Range;

  @Prop({ type: TeamRange })
  teamRequirement: TeamRange;

  @Prop()
  thumbnail: string;

  @Prop()
  headerTitleImage: string;

  @Prop()
  headerImgBackground: string;

  @Prop()
  mainDescription: string;

  @Prop()
  videoDescription: string;

  @Prop()
  submissionDescription: string;

  @Prop()
  ruleDescription: string;

  @Prop()
  resourceDescription: string;

  @Prop()
  communityChatLink: string;

  @Prop({ type: [Task] })
  tasks: Task[];

  @Prop({ type: [Discussion], default: [] })
  discussions: Discussion[];

  @Prop({ type: [UpdateNew], default: [] })
  updateNews: UpdateNew[];

  @Prop()
  subjectMailTitle: string;

  @Prop()
  contentMailRegister: string;

  @Prop({ type: Submission })
  submissions: Submission;

  @Prop()
  judgingType: string;

  @Prop()
  judgingPeriod: DateRange;

  @Prop()
  judges: Judges[];

  @Prop()
  criteria: Criteria[];

  @Prop({ type: Date })
  winnersAnnounced: Date;

  @Prop()
  prizeCurrency: string;

  @Prop()
  prizes: Prize[];

  @Prop({ type: Types.ObjectId, ref: 'UserDocument' })
  user: Types.ObjectId;

  @Prop({ default: false })
  block: boolean;

  @Prop()
  location: string;

  @Prop()
  criteriaScore: Range;
}
export const HackathonSchema = SchemaFactory.createForClass(HackathonDocument);
