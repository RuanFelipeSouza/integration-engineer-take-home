import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto, Task } from './tasks.dto';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a task', async () => {
    const taskDto: CreateTaskDto = {
      title: 'Test Task',
      description: 'Description of the test task',
    };
    const createdTask: Task = { id: '1', ...taskDto };

    jest.spyOn(service, 'create').mockResolvedValue(createdTask);

    expect(await controller.create(taskDto)).toEqual(createdTask);
    expect(service.create).toHaveBeenCalledWith(taskDto);
  });

  it('should get all tasks', async () => {
    const tasks: Task[] = [
      {
        id: '1',
        title: 'Test Task',
        description: 'Description of the test task',
      },
    ];

    jest.spyOn(service, 'findAll').mockResolvedValue(tasks);

    expect(await controller.findAll()).toBe(tasks);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should update a task', async () => {
    const taskDto: UpdateTaskDto = {
      title: 'Updated Task',
      description: 'Updated description',
    };
    const updatedTask: Task = { id: '1', ...taskDto };

    jest.spyOn(service, 'update').mockResolvedValue(updatedTask);

    expect(await controller.update('1', taskDto)).toEqual(updatedTask);
    expect(service.update).toHaveBeenCalledWith('1', taskDto);
  });

  it('should delete a task', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);

    expect(await controller.remove('1')).toBeUndefined();
    expect(service.remove).toHaveBeenCalledWith('1');
  });
});
