import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './tasks.dto';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a task', () => {
    const taskDto: CreateTaskDto = {
      title: 'Test Task',
      description: 'Description of the test task',
    };
    jest
      .spyOn(service, 'create')
      .mockImplementation(() => ({ id: 1, ...taskDto }));
    expect(controller.create(taskDto)).toEqual({ id: 1, ...taskDto });
  });

  it('should get all tasks', () => {
    const tasks = [
      {
        id: 1,
        title: 'Test Task',
        description: 'Description of the test task',
      },
    ];
    jest.spyOn(service, 'findAll').mockImplementation(() => tasks);
    expect(controller.findAll()).toBe(tasks);
  });

  it('should update a task', () => {
    const taskDto: UpdateTaskDto = {
      title: 'Updated Task',
      description: 'Updated description',
    };
    jest
      .spyOn(service, 'update')
      .mockImplementation(() => ({ id: 1, ...taskDto }));
    expect(controller.update('1', taskDto)).toEqual({ id: 1, ...taskDto });
  });

  it('should delete a task', () => {
    jest.spyOn(service, 'remove').mockImplementation(() => undefined);
    expect(controller.remove('1')).toBeUndefined();
  });
});
