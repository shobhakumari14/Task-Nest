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
import { TodoApiService } from './todo-api.service';
import { CreateTodoApiDto } from './dto/create-todo-api.dto';
import { UpdateTodoApiDto } from './dto/update-todo-api.dto';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';


export enum TodoStatus {
  Pending ='pending',
  Completed='completed',
}

@ApiTags('Todo-Api')
@Controller('todo')
export class TodoApiController {
  constructor(private readonly todosService: TodoApiService) {}

  // get all todos
  @ApiOperation({
    summary: 'get all todo',
  })
  @Get()
  getTodos() {
    return this.todosService.getAllTodos();
  }

  // get todo by id
  @ApiOperation({
    summary: 'get todo by ID',
  })
  @Get(':id')
  getTodoById(@Param('id') id: string) {
    return this.todosService.getTodoById(Number(id));
  }

  // create todo
  @ApiOperation({
    summary: 'create new todo',
  })
  @Post('addtodo')
  @ApiQuery({name: 'status', enum: TodoStatus})
  async createTodo(@Body() todo: CreateTodoApiDto, @Query('status') role: TodoStatus = TodoStatus.Pending) {
    return this.todosService.createTodo(todo);
  }

  // update todo
  @ApiOperation({
    summary: 'edit existing todo by ID',
  })
  @Put(':id')
  async updatePost(@Param('id') id: string, @Body() todo: UpdateTodoApiDto) {
    return this.todosService.updateTodo(Number(id), todo);
  }

  //delete todo
  @ApiOperation({
    summary: 'delete todo by ID',
  })
  @Delete(':id')
  async deleteTodo(@Param('id') id: string) {
    this.todosService.deleteTodo(Number(id));
  }

  //soft delete todo
  @ApiOperation({
    summary: 'remove todo by ID',
  })
  @Delete(':id')
  async removeTodo(@Param('id') id: string) {
    this.todosService.removeTodo(Number(id));
  }


  //retrieve soft deleted todo
  @ApiOperation({
    summary: 'retrieve removed todo by ID',
  })
  @Delete(':id')
  async undoRemovedTodo(@Param('id') id: string) {
    this.todosService.undoRemovedTodo(Number(id));
  }
}
