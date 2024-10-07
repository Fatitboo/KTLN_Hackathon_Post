import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: {
    createdAt: 'create_at',
    updatedAt: 'update_at',
  },
  collection: 'Hackathons',
})
export class HackathonDocument {
  @Prop({ require: true })
  hackathonName: string;
}

export const HackathonSchema = SchemaFactory.createForClass(HackathonDocument);
