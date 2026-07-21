import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventsModule } from './events/events.module';
import { EventEntity } from './events/events.entity';

@Module({
  imports: [
  ConfigModule.forRoot({ isGlobal: true }),
  TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
  const dbConfig = {
    host: config.get('DB_HOST'),
    port: config.get('DB_PORT'),
    username: config.get('DB_USERNAME'),
    database: config.get('DB_NAME'),
  };
  return {
    type: 'postgres' as const,
    ...dbConfig,
    password: config.get('DB_PASSWORD'),
    entities: [EventEntity],
    synchronize: true,
  };
},
}),
    EventsModule,
  ],
})
export class AppModule {}