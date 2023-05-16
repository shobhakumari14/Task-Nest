import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportEntity } from '../reports/report.entity';
import { TodoEntity } from '../todo-api/entities/todo-api.entity';
import { UserEntity } from '../users/user.entity';
import { MessageEntity } from '../messages/entities/message.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => (
        {
        type: 'postgres',
        host: config.get('POSTGRES_HOST'),
        port: config.get('POSTGRES_PORT'),
        username: config.get('POSTGRES_USER'),
        password: config.get('POSTGRES_PASSWORD'),
        database: config.get('POSTGRES_DB'),
        entities: [UserEntity, ReportEntity, TodoEntity, MessageEntity],
        synchronize: true, //should be false at production
        
      }),
    }),
  ],
})
export class DatabaseModule {}
