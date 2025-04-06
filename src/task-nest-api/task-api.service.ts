import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { TaskEntity } from './entities';
import { UpdateTaskApiDto, CreateTaskApiDto } from './dto';

@Injectable()
export class TaskApiService {
  constructor(
    @InjectRepository(TaskEntity) private todoRepo: Repository<TaskEntity>,
    @InjectConnection() private connection: Connection,
  ) {}

  // find all
  async getAllTasks() {
    const getTask = await this.connection
      .createQueryBuilder()
      .select('*')
      .from('TaskEntity', 'mbjh')
      .getRawMany();
    return getTask;
  }

  // find by id
  async getTaskById(id: number) {
    const task = await this.todoRepo.findOneBy({ id });
    if (task) {
      return task;
    }

    throw new HttpException('task not found', HttpStatus.NOT_FOUND);
  }

  // create
  async createTask(task: CreateTaskApiDto) {
    const newTask = this.todoRepo.create(task);
    await this.todoRepo.save(newTask);

    return newTask;
  }

  // update
  async updateTask(id: number, post: UpdateTaskApiDto) {
    await this.todoRepo.update(id, post);
    const updatedTask = await this.todoRepo.findOneBy({ id });
    if (updatedTask) {
      return updatedTask;
    }

    throw new HttpException('task not found', HttpStatus.NOT_FOUND);
  }

  // permanent-delete
  async deleteTask(id: number) {
    const deletedTask = await this.todoRepo.delete(id);
    if (!deletedTask.affected) {
      throw new HttpException('task not found', HttpStatus.NOT_FOUND);
    }
  }

  //soft delete task
  async removeTask(id: number) {
    this.todoRepo.softDelete(Number(id));
  }

  //retrieve soft deleted task
  async undoRemovedTask(id: number) {
    this.todoRepo.restore(Number(id));
  }
}
