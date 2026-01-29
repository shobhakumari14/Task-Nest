import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Put,
  Query,
} from '@nestjs/common';
import { TaskApiService } from './task-api.service';
import { CreateTaskApiDto, UpdateTaskApiDto } from './dto';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';


export enum TaskStatus {
  Pending ='1',
  Completed ='2',
}

@ApiTags('Task-Api')
@Controller('task')
export class TaskApiController {
  constructor(private readonly todosService: TaskApiService) {}

  // get all todos
  // @ApiOperation({
  //   summary: 'get all task',
  // })
  @Get()
  getTasks() {
    return this.todosService.getAllTasks();
  }

  // get task by id
  // @ApiOperation({
  //   summary: 'get task by ID',
  // })
  @Get(':id')
  getTaskById(@Param('id') id: string) {
    return this.todosService.getTaskById(Number(id));
  }

  // create task
  // @ApiOperation({
  //   summary: 'create new task',
  // })
  @Post('addtodo')
  @ApiQuery({name: 'status', enum: TaskStatus})
  async createTask(@Body() task: CreateTaskApiDto, @Query('status') role: TaskStatus = TaskStatus.Pending) {
    return this.todosService.createTask(task);
  }

  // update task
  // @ApiOperation({
  //   summary: 'edit existing task by ID',
  // })
  @Put(':id')
  async updatePost(@Param('id') id: string, @Body() task: UpdateTaskApiDto) {
    return this.todosService.updateTask(Number(id), task);
  }

  //delete task
  // @ApiOperation({
  //   summary: 'delete task by ID',
  // })
  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    this.todosService.deleteTask(Number(id));
  }

  //soft delete task
  // @ApiOperation({
  //   summary: 'remove task by ID',
  // })
  @Delete(':id')
  async removeTask(@Param('id') id: string) {
    this.todosService.removeTask(Number(id));
  }


  //retrieve soft deleted task
  // @ApiOperation({
  //   summary: 'retrieve removed task by ID',
  // })
  @Delete(':id')
  async undoRemovedTask(@Param('id') id: string) {
    this.todosService.undoRemovedTask(Number(id));
  }
}
