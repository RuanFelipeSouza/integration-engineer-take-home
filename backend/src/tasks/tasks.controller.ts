import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, Task, UpdateTaskDto } from './tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UsePipes(
    new ValidationPipe({
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  )
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  async findAll(): Promise<Task[]> {
    return await this.tasksService.findAll();
  }

  @Put(':id')
  @UsePipes(
    new ValidationPipe({
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return await this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.tasksService.remove(id);
  }
}
