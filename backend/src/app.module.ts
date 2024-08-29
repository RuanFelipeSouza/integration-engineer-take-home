import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { AwsModule } from './third-party/aws.module';
import { DatabaseModule } from './database/config/mongoose.module';
import { UserModule } from './users/user.module';
import { AuthModule } from './config/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './config/auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    JwtModule,
    AuthModule,
    UserModule,
    TasksModule,
    AwsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
