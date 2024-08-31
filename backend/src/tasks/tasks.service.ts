import { Injectable } from '@nestjs/common';
import { CreateTaskDto, Task, UpdateTaskDto } from './tasks.dto';
import { AwsService } from '../third-party/aws.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskModel } from '../database/schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(TaskModel.name) private taskModel: Model<Task>,
    private readonly awsService: AwsService,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = new this.taskModel({ ...createTaskDto }).save();
    await this.awsService.callLambda();
    return newTask;
  }

  async findAll(): Promise<Task[]> {
    return await this.taskModel.find();
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const updatedTask = await this.taskModel.findOneAndUpdate(
      { id: id },
      {
        ...updateTaskDto,
      },
      { new: true },
    );

    return updatedTask;
  }

  async remove(id: string): Promise<void> {
    await this.taskModel.findOneAndDelete({ id: id });
  }
}
