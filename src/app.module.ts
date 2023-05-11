import { MiddlewareConsumer, Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
// import { UserEntity } from './users/user.entity';
// import { ReportEntity } from './reports/report.entity';
import { MessagesModule } from './messages/messages.module';
import { TodoApiModule } from './todo-api/todo-api.module';
import { JwtAuthModule } from './jwt-auth/jwt-auth.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './cookie-session-auth/cookie-session-auth.module';
const cookieSession = require('cookie-session');
import * as Joi from 'joi';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      // validationSchema: Joi.object({
      //   POSTGRES_HOST: Joi.string().required(),
      //   POSTGRES_PORT: Joi.number().required(),
      //   POSTGRES_USER: Joi.string().required(),
      //   POSTGRES_PASSWORD: Joi.string().required(),
      //   POSTGRES_DB: Joi.string().required(),
      //   PORT: Joi.number(),
      // }),
    }),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => {
    //     return {
    //       type: 'sqlite',
    //       database: config.get<string>('DB_NAME'),
    //       synchronize: true,
    //       entities: [UserEntity, ReportEntity],
    //     };
    //   },
    // }),
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database : 'db.sqlite',
    //   entities : [UserEntity, ReportEntity],
    //   synchronize: true,
    // }),
    AuthModule,
    DatabaseModule,
    JwtAuthModule,
    MessagesModule,
    ReportsModule,
    TodoApiModule,
    UsersModule,   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: ['asdfgh'],
        }),
      )
      .forRoutes('*');
  }
}
