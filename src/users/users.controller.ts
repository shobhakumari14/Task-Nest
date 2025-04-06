import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  Delete,
  Patch,
  NotFoundException,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { UserEntity } from './user.entity';
import { AuthGuard } from '../guards/auth.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';


@ApiTags('Users')
@Controller('user')
@Serialize(UserDto)
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private userService: UsersService) {}

  // @Get('/currentuser')
  // currentUserLoggedIn(@Session() session: any){
  // if(session.userId){ return this.userService.findOne(session.userId);
  // }
  // return 'Currently no user is signedIn';
  // }

  // @ApiOperation({
  //   summary: 'logout current user',
  // })
  @Post('logout')
 logOut(@Session() session: any) {
    session.userId = null;
    return true;
  }

  // @ApiOperation({
  //   summary: 'get user',
  // })
  @Get(':id')
  async findUserById(@Param('id') id: string) {
    const user = await this.userService.findOneById(parseInt(id));
    if (!user) {
      throw new NotFoundException('MISSING USER');
    }
    return user;
  }


  // @ApiOperation({
  //   summary: 'get user',
  // })
  @Get()
  findAllUser(@Query('email') email: string): Promise<UserEntity[]> {
    return this.userService.findByEmail(email);
  }


  @ApiOperation({
    summary: 'delete existing user',
  })
  @Delete(':id')
  removeUserById(@Param('id') id: string) {
    return this.userService.removeById(parseInt(id));
  }

  
  @ApiOperation({
    summary: 'edit user details',
  })
  @Patch(':id')
  updateUserById(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.updateById(parseInt(id), body);
  }

}
