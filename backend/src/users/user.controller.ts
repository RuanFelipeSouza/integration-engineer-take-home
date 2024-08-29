import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpExceptionOptions,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './users.service';
import { UserDTO } from './user.dto';
import { Public } from 'src/decorators/isPublic';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  async create(@Body() user: UserDTO): Promise<UserDTO | HttpExceptionOptions> {
    if (!user.username || !user.password)
      return new BadRequestException({ message: 'Missing parameter' });
    return await this.userService.create(user);
  }

  @Get()
  async findOne(
    @Query('username') username: string,
  ): Promise<UserDTO | HttpExceptionOptions> {
    if (!username) {
      return new BadRequestException({ message: 'Missing parameter' });
    }
    return await this.userService.findOne(username);
  }
}
