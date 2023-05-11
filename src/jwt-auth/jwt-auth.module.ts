import { Module } from '@nestjs/common';
import { JwtAuthService } from './jwt-auth.service';
import { JwtAuthController } from './jwt-auth.controller';

@Module({
  controllers: [JwtAuthController],
  providers: [JwtAuthService]
})
export class JwtAuthModule {}
