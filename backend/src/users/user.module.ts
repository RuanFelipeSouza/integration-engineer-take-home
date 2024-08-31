import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '../database/config/mongoose.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
