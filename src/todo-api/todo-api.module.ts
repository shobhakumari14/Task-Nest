import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoApiService } from './todo-api.service';
import { TodoApiController } from './todo-api.controller';
import { TodoEntity } from './entities/todo-api.entity';


@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  controllers: [TodoApiController],
  providers: [TodoApiService]
})
export class TodoApiModule {}
