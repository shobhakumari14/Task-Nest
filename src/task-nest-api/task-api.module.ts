import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskApiService } from './task-api.service';
import { TaskApiController } from './task-api.controller';
import { TaskEntity } from './entities';


@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  controllers: [TaskApiController],
  providers: [TaskApiService]
})
export class TaskApiModule {}
