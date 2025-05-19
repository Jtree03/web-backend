import { Event } from '../../events/models/event.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RuleOperator, RuleType } from 'libs/enums/event-rule.enum';
import { HydratedDocument, Types, SchemaTypes } from 'mongoose';

export type EventRuleDocument = HydratedDocument<EventRule>;

@Schema()
export class EventRule {
  @Prop({
    type: Types.ObjectId,
    ref: 'Event',
    required: true,
  })
  event: Event;

  @Prop({ type: String, required: true })
  actionType: string;

  @Prop({ type: String, enum: RuleOperator, required: true })
  operator: RuleOperator;

  @Prop({ type: Number, required: true, default: 1 })
  threshold: number;
}

export const EventRuleSchema = SchemaFactory.createForClass(EventRule);
EventRuleSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v;
    delete ret._id;
    return ret;
  },
});
