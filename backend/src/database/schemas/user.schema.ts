import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'users' })
export class UserModel extends Document {
  @Prop({ require: true, unique: true })
  username: string;

  @Prop({ require: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
