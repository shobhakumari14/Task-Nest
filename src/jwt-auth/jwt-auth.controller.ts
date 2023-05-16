import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete 
} from '@nestjs/common';
import { JwtAuthService } from './jwt-auth.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { UpdateUserDto } from '../users/dtos/update-user.dto';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';


@ApiTags('JWT-Auth')
@Controller('jwtauth')
export class JwtAuthController {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  @ApiOperation({})
  @Post()
  create(@Body() createJwtAuthDto: CreateUserDto) {
    return this.jwtAuthService.create(createJwtAuthDto);
  }

  @ApiOperation({})
  @Get()
  findAll() {
    return this.jwtAuthService.findAll();
  }

  @ApiOperation({})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jwtAuthService.findOne(+id);
  }

  @ApiOperation({})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJwtAuthDto: UpdateUserDto) {
    return this.jwtAuthService.update(+id, updateJwtAuthDto);
  }

  @ApiOperation({})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jwtAuthService.remove(+id);
  }
}
