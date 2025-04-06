import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  Session,
  ForbiddenException,
} from '@nestjs/common';
import { AuthService } from './cookie-session-auth.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { UserEntity } from '../users/user.entity';
import { UserDto } from '../users/dtos/user.dto';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { SigninUserDto } from '../users/dtos/signin-user.dto';
import { UserRole } from '../enums/user-role.enum';



@ApiTags('cookie-session-auth')
@Controller('auth')
@Serialize(UserDto)
export class AuthController {
  constructor(private AuthService: AuthService) {}


  @ApiOperation({
    summary: 'create new user',
  })
  @Post('signup')
  @ApiQuery({ name: 'role', enum: UserRole })
  async createUser(
    @Body() userObj: CreateUserDto,
    @Session() session: any,
    @Query('role') role: UserRole = UserRole.USER,
  ) {
    const { name, email, password } = userObj;
    const user = await this.AuthService.signup(role, name, email, password);
    const { id } = user;
    session.userId = id;
    return user;
  }

  @ApiOperation({
    summary: 'signIn existing user',
  })
  @Post('signin')
  async userLogin(@Body() user: SigninUserDto, @Session() session: any) {
    const { email, password } = user;
    const users = await this.AuthService.signin(email, password);
    const { id } = users;
    session.userId = id;
    return users;
  }

  @ApiOperation({
    summary: 'check loggedIn user',
  })
  @Get('currentuser')
 userMe(@CurrentUser() user: UserEntity) {
    if (!user) {
      return new ForbiddenException('forbidden');
    }
    return user;
  }
}
