import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  Session,
} from '@nestjs/common';
import { AuthService } from './cookie-session-auth.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { UserEntity } from '../users/user.entity';
import { UserDto } from '../users/dtos/user.dto';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { SigninUserDto } from '../users/dtos/signin-user.dto';

export enum UserRole {
  User = 'user',
  Admin = 'admin',
}

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
    @Body() body: CreateUserDto,
    @Session() session: any,
    @Query('role') role: UserRole = UserRole.User,
  ) {
    const user = await this.AuthService.signup(
      role,
      body.name,
      body.email,
      body.password,
    );
    session.userId = user.id;
    return user;
  }

  @ApiOperation({
    summary: 'signIn existing user',
  })
  @Post('signin')
  async userSignin(@Body() body: SigninUserDto, @Session() session: any) {
    const user = await this.AuthService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @ApiOperation({
    summary: 'check loggedIn user',
  })
  @Get('currentuser')
 currentLoggedInUser(@CurrentUser() user: UserEntity) {
    if (!user) {
      return 'Currently no user is signedIn';
    }
    return user;
  }

}
