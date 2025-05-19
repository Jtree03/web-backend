import { Event } from '../../events/models/event.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RewardDocument = HydratedDocument<Reward>;

@Schema()
export class Reward {
  @Prop({
    type: Types.ObjectId,
    ref: 'Event',
    required: true,
  })
  event: Event;

  @Prop({ type: String, required: true })
  itemID: string;

  @Prop({ type: Number, required: true, default: 1 })
  quantity: number;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
RewardSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v;
    delete ret._id;
    return ret;
  },
});
