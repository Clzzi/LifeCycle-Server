import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ({
        type: 'mysql',
        host: ConfigService.get('database.host'),
        port: ConfigService.get('database.port'),
        usernamek: ConfigService.get('database.user'),
        password: ConfigService.get('database.password'),
        database: ConfigService.get('database.name'),
        entities: [],
        synchronize: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
