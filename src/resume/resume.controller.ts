import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Token } from 'src/common/decorators/token.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import DataResponse from 'src/common/response/DataResponse';
import Response from 'src/common/response/response';
import { User } from 'src/user/entities/user.entity';
import { ResumeDto } from './dto/resume.dto';
import { Resume } from './entities/resume.entity';
import { ResumeService } from './resume.service';

@Controller('/resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Get()
  @HttpCode(200)
  async getResume(): Promise<DataResponse<Resume[]>> {
    const resumes: Resume[] = await this.resumeService.getResume();
    return DataResponse.dataSuccess('이력서 조회 완료', resumes);
  }

  @UseGuards(AuthGuard)
  @Get('/:idx')
  @HttpCode(200)
  async getResumeByIdx(
    @Param('idx') idx: number,
  ): Promise<DataResponse<Resume>> {
    const resume: Resume = await this.resumeService.getResumeByIdx(idx);
    return DataResponse.dataSuccess('이력서 상세조회 완료', resume);
  }

  @UseGuards(AuthGuard)
  @Post()
  async createResume(
    @Body() dto: ResumeDto,
    @Token() user: User,
  ): Promise<Response> {
    await this.resumeService.createResume(dto, user);
    return Response.success('이력서 등록 성공');
  }

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Delete()
  async deleteResume(@Token() user: User): Promise<Response> {
    await this.resumeService.deleteResume(user.resume.idx, user);
    return Response.success('이력서 삭제 성공');
  }

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Put()
  async updateResume(
    @Token() user: User,
    @Body() dto: ResumeDto,
  ): Promise<Response> {
    const resume: Resume = await this.resumeService.updateResume(dto, user);
    return DataResponse.dataSuccess('이력서 수정 완료', resume);
  }
}
