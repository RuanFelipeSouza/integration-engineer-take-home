import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto, Task, UpdateTaskDto } from './tasks.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private nextId = 1;

  create(createTaskDto: CreateTaskDto): Task {
    const task: Task = {
      id: this.nextId++,
      ...createTaskDto,
    };
    this.tasks.push(task);
    return task;
  }

  findAll(): Task[] {
    return this.tasks;
  }

  update(id: number, updateTaskDto: UpdateTaskDto): Task {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    const updatedTask = { ...this.tasks[taskIndex], ...updateTaskDto };
    this.tasks[taskIndex] = updatedTask;
    return updatedTask;
  }

  remove(id: number): void {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    this.tasks.splice(taskIndex, 1);
  }
}
