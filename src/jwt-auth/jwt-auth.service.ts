import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { UpdateUserDto } from '../users/dtos/update-user.dto';

@Injectable()
export class JwtAuthService {
  create(createJwtAuthDto: CreateUserDto) {
    return 'This action adds a new jwtAuth';
  }

  findAll() {
    return `This action returns all jwtAuth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jwtAuth`;
  }

  update(id: number, updateJwtAuthDto: UpdateUserDto) {
    return `This action updates a #${id} jwtAuth`;
  }

  remove(id: number) {
    return `This action removes a #${id} jwtAuth`;
  }
}
