import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { AwsModule } from '../third-party/aws.module';
import { DatabaseModule } from 'src/database/config/mongoose.module';

@Module({
  imports: [DatabaseModule, AwsModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
