import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
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
  managerMail: string;

  @Prop()
  hostName: string;

  @Prop({ type: [String] })
  hackathonTypes: string[];

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

  @Prop()
  winnersAnnounced: string;

  @Prop()
  prizeCurrency: string;

  @Prop()
  prizes: Prize[];

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;
}
export const HackathonSchema = SchemaFactory.createForClass(HackathonDocument);
