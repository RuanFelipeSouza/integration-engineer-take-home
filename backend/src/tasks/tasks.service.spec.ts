import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './tasks.dto';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task', () => {
    const taskDto: CreateTaskDto = {
      title: 'Test Task',
      description: 'Description of the test task',
    };
    const createdTask = service.create(taskDto);
    expect(createdTask).toEqual(expect.objectContaining(taskDto));
  });

  it('should get all tasks', () => {
    const tasks = service.findAll();
    expect(tasks).toBeInstanceOf(Array);
  });

  it('should update a task', () => {
    const taskDto: CreateTaskDto = {
      title: 'Test Task',
      description: 'Description of the test task',
    };
    const createdTask = service.create(taskDto);
    const updateDto: UpdateTaskDto = {
      title: 'Updated Task',
      description: 'Updated description',
    };
    const updatedTask = service.update(createdTask.id, updateDto);
    expect(updatedTask.title).toBe('Updated Task');
    expect(updatedTask.description).toBe('Updated description');
  });

  it('should delete a task', () => {
    const taskDto: CreateTaskDto = {
      title: 'Test Task',
      description: 'Description of the test task',
    };
    const createdTask = service.create(taskDto);
    service.remove(createdTask.id);
    const tasks = service.findAll();
    expect(tasks).not.toContainEqual(expect.objectContaining(taskDto));
  });
});
