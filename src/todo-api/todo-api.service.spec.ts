import { Test, TestingModule } from '@nestjs/testing';
import { TodoApiService } from './todo-api.service';

describe('TodoApiService', () => {
  let service: TodoApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoApiService],
    }).compile();

    service = module.get<TodoApiService>(TodoApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
