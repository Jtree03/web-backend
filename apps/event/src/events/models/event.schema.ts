import { EventRule } from '../../event-rules/models/event-rule.schema';
import { Reward } from '../../rewards/models/reward.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RuleLogic } from 'libs/enums/event-rule.enum';
import { EventStatus } from 'libs/enums/event-status.enum';
import { HydratedDocument, Types } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Date })
  startDate?: Date;

  @Prop({ type: Date })
  endDate?: Date;

  @Prop({ type: String, enum: EventStatus, default: EventStatus.Active })
  status: EventStatus;

  @Prop({ type: String, enum: RuleLogic, default: RuleLogic.And })
  ruleLogic: RuleLogic;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'EventRule' }],
    required: true,
  })
  rules: EventRule[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Reward' }] })
  rewards: Reward[];
}

export const EventSchema = SchemaFactory.createForClass(Event);
EventSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v;
    delete ret._id;
    return ret;
  },
});
