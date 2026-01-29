import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportEntity } from '../../reports/report.entity';
import { TaskEntity } from '../../task-nest-api/entities/task-api.entity';
import { UserEntity } from '../../users/user.entity';
import { MessageEntity } from '../../messages/entities/message.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const isProduction = process.env.NODE_ENV === 'production';

        return {
          type: 'postgres',
          host: config.get<string>('POSTGRES_HOST'),
          port: Number(config.get('POSTGRES_PORT')),
          username: config.get<string>('POSTGRES_USER'),
          password: config.get<string>('POSTGRES_PASSWORD'),
          database: config.get<string>('POSTGRES_DB'),
          entities: [UserEntity, ReportEntity, TaskEntity, MessageEntity],
          synchronize: !isProduction, // ✅ true in dev/docker, false in prod
        };
      },
    }),
  ],
})
export class DatabaseModule {}
