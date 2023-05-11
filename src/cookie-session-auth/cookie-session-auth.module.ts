import { Module } from '@nestjs/common';
import { AuthService } from './cookie-session-auth.service';
import { AuthController } from './cookie-session-auth.controller';
import { UsersService } from '../users/users.service';



@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService,UsersService ]
})
export class AuthModule {}
