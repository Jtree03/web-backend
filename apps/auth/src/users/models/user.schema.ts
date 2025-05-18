import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'libs/enums/role.enum';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: String, required: true })
  nickname: string;

  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  email: string;

  @Prop({ type: String, required: true })
  password: string; // hashed password

  @Prop({ type: String, enum: Role, default: Role.User })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.__v;
    delete ret._id;
    return ret;
  },
});

export type UserWithoutPassword = Omit<UserDocument, 'password'>;
