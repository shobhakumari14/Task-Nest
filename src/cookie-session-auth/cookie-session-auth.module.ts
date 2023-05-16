import { Module } from '@nestjs/common';
import { AuthService } from './cookie-session-auth.service';
import { AuthController } from './cookie-session-auth.controller';
import { UsersModule } from '../users/users.module';



@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
