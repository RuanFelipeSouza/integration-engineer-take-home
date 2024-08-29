import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
@Schema({ collection: 'task-management' })
export class TaskModel extends Document {
  @Prop({ default: uuidv4, required: true })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;
}

export const TaskSchema = SchemaFactory.createForClass(TaskModel);
