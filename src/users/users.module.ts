import { MiddlewareConsumer, Module} from '@nestjs/common';
// import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';
// import { SerializeInterceptor } from '../interceptors/serialize.interceptor';
// import { CurrentUserInterceptor } from './interceptors/current-user.interceptors';
import { CurrentUserMiddleware } from '../middleware/current-user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    UsersService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CurrentUserInterceptor
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: SerializeInterceptor
    // },
  ],
  exports:[UsersService]
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer)
  {
     consumer.apply(CurrentUserMiddleware).forRoutes('*')
  }
 }