import { Test, TestingModule } from '@nestjs/testing';
import { TaskApiController } from './task-api.controller';
import { TaskApiService } from './task-api.service';

describe('TaskApiController', () => {
  let controller: TaskApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskApiController],
      providers: [TaskApiService],
    }).compile();

    controller = module.get<TaskApiController>(TaskApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
