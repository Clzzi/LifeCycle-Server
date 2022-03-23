import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from 'src/config/env.validation';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFilter } from './common/filters/error.filter';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate,
    }),
    DatabaseModule,
    UserModule,
    TokenModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
})
export class AppModule {}
