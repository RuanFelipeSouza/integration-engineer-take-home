import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModel, TaskSchema } from '../schemas/task.schema';
import { UserModel, UserSchema } from '../schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('DATABASE_URL'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    MongooseModule.forFeature([
      {
        name: TaskModel.name,
        schema: TaskSchema,
      },
      {
        name: UserModel.name,
        schema: UserSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
