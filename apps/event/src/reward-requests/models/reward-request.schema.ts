import { Event } from '../../events/models/event.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { RequestStatus } from 'libs/enums/reward-request.enum';
import { HydratedDocument, Types } from 'mongoose';

export type RewardRequestDocument = HydratedDocument<RewardRequest>;

@Schema({ timestamps: true })
export class RewardRequest {
  @Prop({
    type: Types.ObjectId,
    required: true,
  })
  userID: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Event',
    required: true,
  })
  event: Event;

  @Prop({ type: String, required: true })
  status: RequestStatus;

  @Prop({ type: Date })
  @Type(() => Date)
  createdAt?: Date;

  @Prop({ type: Date })
  @Type(() => Date)
  updatedAt?: Date;
}

export const RewardRequestSchema = SchemaFactory.createForClass(RewardRequest);
RewardRequestSchema.index({ userID: 1, event: 1 });
RewardRequestSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v;
    delete ret._id;
    return ret;
  },
});
