import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { AwsService } from '../third-party/aws.service';
import { getModelToken } from '@nestjs/mongoose';
import { TaskModel } from '../database/schemas/task.schema';
import { Model } from 'mongoose';
import { UpdateTaskDto } from './tasks.dto';

describe('TasksService', () => {
  let service: TasksService;
  let awsService: AwsService;
  let taskModel: Model<TaskModel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: AwsService,
          useValue: { callLambda: jest.fn() },
        },
        {
          provide: getModelToken(TaskModel.name),
          useValue: {
            find: jest.fn(),
            findOneAndUpdate: jest.fn(),
            findOneAndDelete: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    awsService = module.get<AwsService>(AwsService);
    taskModel = module.get<Model<TaskModel>>(getModelToken(TaskModel.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const tasks = [{ id: '1', title: 'Task 1', description: 'Desc 1' }];
      jest.spyOn(taskModel, 'find').mockResolvedValue(tasks as any);

      const result = await service.findAll();

      expect(result).toEqual(tasks);
    });
  });

  describe('update', () => {
    it('should update a task by id', async () => {
      const updateTaskDto: UpdateTaskDto = {
        title: 'Updated Task',
        description: 'Updated Description',
      };

      const updatedTask = { id: '1', ...updateTaskDto };
      jest
        .spyOn(taskModel, 'findOneAndUpdate')
        .mockResolvedValue(updatedTask as any);

      const result = await service.update('1', updateTaskDto);

      expect(result).toEqual(updatedTask);
    });
  });

  describe('remove', () => {
    it('should delete a task by id', async () => {
      jest.spyOn(taskModel, 'findOneAndDelete').mockResolvedValue({} as any);

      await service.remove('1');

      expect(taskModel.findOneAndDelete).toHaveBeenCalledWith({ id: '1' });
    });
  });
});
