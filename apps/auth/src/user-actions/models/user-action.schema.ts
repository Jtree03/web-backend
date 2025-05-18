import { User } from '../../users/models/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { HydratedDocument, Types } from 'mongoose';

export type UserActionDocument = HydratedDocument<UserAction>;

@Schema({ timestamps: true })
export class UserAction {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user: User;

  @Prop({ type: String, required: true })
  actionType: string;

  @Prop({ type: Date })
  @Type(() => Date)
  actionDate?: Date;

  @Prop({ type: Number, default: 1 })
  sum: number;

  @Prop({ type: Date })
  @Type(() => Date)
  createdAt?: Date;

  @Prop({ type: Date })
  @Type(() => Date)
  updatedAt?: Date;
}

export const UserActionSchema = SchemaFactory.createForClass(UserAction);
UserActionSchema.index(
  { user: 1, actionType: 1, actionDate: 1 },
  { unique: true },
);
UserActionSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v;
    delete ret._id;
    return ret;
  },
});
