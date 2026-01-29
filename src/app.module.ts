import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
// import { UserEntity } from './users/user.entity';
// import { ReportEntity } from './reports/report.entity';
import { MessagesModule } from './messages/messages.module';
import { TaskApiModule } from './task-nest-api/task-api.module';
import { JwtAuthModule } from './jwt-auth/jwt-auth.module';
import { DatabaseModule } from './common/database/database.module';
import { AuthModule } from './cookie-session-auth/cookie-session-auth.module';
import cookieSession from 'cookie-session';
import Joi from 'joi';
import { UserAgentMiddleware } from './middleware/userAgent.middleware';
import { LoggerService } from './common/services';
import { UtilService } from './common/util/util.service';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';
import { CaptchaMiddleware } from './middleware/captcha.middleware';
const typeORMLogging: LoggerOptions = ['query'];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        logging: typeORMLogging,
      }),
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
    UsersModule,
    ReportsModule,
    MessagesModule,
    DatabaseModule,
    TaskApiModule,
    JwtAuthModule,
    AuthModule,
    ConfigModule.forRoot(
      {
      isGlobal: true,
      })
  ],
  controllers: [AppController],
  providers: [AppService, LoggerService, UtilService],
  exports: [LoggerService, UtilService],
})
export class AppModule 
{
  configure(consumer: MiddlewareConsumer) 
  {
    consumer.apply(cookieSession({ keys: ['404dieueyf7huienejnfef403'] })).forRoutes('*');
    consumer.apply(UserAgentMiddleware).forRoutes({ path: '/user', method: RequestMethod.ALL });
    // consumer.apply(CaptchaMiddleware).forRoutes({ path: '/messages', method: RequestMethod.ALL });
  }
}

// write a code for setting up server session for 5min for that five min user will get access  to entre the form details and after the expire of session generate captcha and verify it and let them to fill forms?
