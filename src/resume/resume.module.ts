import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenModule } from 'src/token/token.module';
import { UserModule } from 'src/user/user.module';
import { ResumeRepository } from './repositories/resume.repository';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ResumeRepository]),
    UserModule,
    TokenModule,
  ],
  controllers: [ResumeController],
  providers: [ResumeService],
  exports: [ResumeService],
})
export class ResumeModule {}
