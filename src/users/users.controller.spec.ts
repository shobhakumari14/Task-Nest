import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';
import { UserEntity } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService,
      {
        provide: UsersService,
        useValue: {
          findOneById: jest.fn((user)=> user),
          findByEmail: jest.fn((userEntity)=> userEntity),
          removeById: jest.fn((id)=> id),
          updateById: jest.fn((id)=> id),
        }
      }]
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('Controller should be defined', () => { expect(controller).toBeDefined(); });
  it('Service should be defined', () => { expect(service).toBeDefined(); });
  
describe('Controller:logOut:POST(logout)', ()=>{
  it('should return "user logged out succesfully"', () => {
    const session = {userId:1}
    expect(controller.logOut(session)).toBe('user logged out succesfully');
    expect(session.userId).toBe(null);
  });
});

describe('Controller:findUserById:GET(:id)', ()=>{
  it('should return "MISSING USER" error when user does not exit', async() => {
   const serviceFindSpy = jest.spyOn(service, 'findOneById').mockResolvedValue(null);
   try{
    const result = await controller.findUserById('1');
   }
   catch(err)
   {
   console.log(err);
   console.log(err.message);
   expect(err).toBeInstanceOf(NotFoundException);
   expect(err.message).toBe('MISSING USER');
  }

  it('should return userObj when there is no Error', async() => {
    const userId: number = 1;
const user = {
  id: userId,
  role: 'admin',
  name: 'Aarav singh',
  email: 'abc@gmail.com',
  password: 'Asdfghj#9876d'
} as UserEntity;
  });
});
});
});