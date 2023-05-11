import { Test, TestingModule } from '@nestjs/testing';
import { TodoApiController } from './todo-api.controller';
import { TodoApiService } from './todo-api.service';

describe('TodoApiController', () => {
  let controller: TodoApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoApiController],
      providers: [TodoApiService],
    }).compile();

    controller = module.get<TodoApiController>(TodoApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
