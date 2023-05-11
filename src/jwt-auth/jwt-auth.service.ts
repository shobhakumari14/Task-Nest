import { Injectable } from '@nestjs/common';
import { CreateJwtAuthDto } from './dto/create-jwt-auth.dto';
import { UpdateJwtAuthDto } from './dto/update-jwt-auth.dto';

@Injectable()
export class JwtAuthService {
  create(createJwtAuthDto: CreateJwtAuthDto) {
    return 'This action adds a new jwtAuth';
  }

  findAll() {
    return `This action returns all jwtAuth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jwtAuth`;
  }

  update(id: number, updateJwtAuthDto: UpdateJwtAuthDto) {
    return `This action updates a #${id} jwtAuth`;
  }

  remove(id: number) {
    return `This action removes a #${id} jwtAuth`;
  }
}
