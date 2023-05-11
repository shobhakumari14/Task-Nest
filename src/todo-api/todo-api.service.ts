import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { CreateTodoApiDto } from './dto/create-todo-api.dto';
import { TodoEntity } from './entities/todo-api.entity';
import { UpdateTodoApiDto } from './dto/update-todo-api.dto';

@Injectable()
export class TodoApiService {
  constructor(
    @InjectRepository(TodoEntity) private todoRepo: Repository<TodoEntity>,
    @InjectConnection() private connection: Connection,
  ) {}

  // find all
  async getAllTodos() {
    const getTodo = await this.connection
      .createQueryBuilder()
      .select('*')
      .from('TodoEntity', 'mbjh')
      .getRawMany();
      console.log(getTodo)
    return getTodo;
  }

  // find by id
  async getTodoById(id: number) {
    const todo = await this.todoRepo.findOneBy({ id });
    if (todo) {
      return todo;
    }

    throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
  }

  // create
  async createTodo(todo: CreateTodoApiDto) {
    const newTodo = this.todoRepo.create(todo);
    await this.todoRepo.save(newTodo);

    return newTodo;
  }

  // update
  async updateTodo(id: number, post: UpdateTodoApiDto) {
    await this.todoRepo.update(id, post);
    const updatedTodo = await this.todoRepo.findOneBy({ id });
    if (updatedTodo) {
      return updatedTodo;
    }

    throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
  }

  // permanent-delete
  async deleteTodo(id: number) {
    const deletedTodo = await this.todoRepo.delete(id);
    if (!deletedTodo.affected) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }
  }

  //soft delete todo
  async removeTodo(id: number) {
    this.todoRepo.softDelete(Number(id));
  }

  //retrieve soft deleted todo
  async undoRemovedTodo(id: number) {
    this.todoRepo.restore(Number(id));
  }
}
