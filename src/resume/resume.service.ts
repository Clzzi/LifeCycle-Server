import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { validationNullORUndefined } from 'src/share/utils/validation.util';
import { User } from 'src/user/entities/user.entity';
import { ResumeDto } from './dto/resume.dto';
import { Resume } from './entities/resume.entity';
import { ResumeRepository } from './repositories/resume.repository';

@Injectable()
export class ResumeService {
  constructor(private readonly resumeRepository: ResumeRepository) {}

  public async getResumeByIdx(idx: number): Promise<Resume> {
    const resume: Resume | undefined = await this.resumeRepository.findByIdx(
      idx,
    );
    if (validationNullORUndefined(resume)) {
      throw new NotFoundException('존재하지 않는 이력서입니다');
    }

    return resume;
  }

  public getResume(): Promise<Resume[]> {
    return this.resumeRepository.find({
      relations: ['user'],
    });
  }

  public async createResume(dto: ResumeDto, user: User): Promise<void> {
    const resume: Resume | undefined = await this.resumeRepository.findOne({
      where: { user: user.userId },
    });

    if (!validationNullORUndefined(resume)) {
      throw new BadRequestException('이미 이력서를 등록하였습니다');
    }

    const data = this.resumeRepository.create(dto);
    data.user = user;
    await this.resumeRepository.save(data);
  }

  public async updateResume(dto: ResumeDto, user: User): Promise<Resume> {
    const resume: Resume | undefined = await this.resumeRepository.findByIdx(
      user.resume.idx,
    );

    this.resumeRepository.merge(resume, dto);
    return await this.resumeRepository.save(resume);
  }

  public async deleteResume(idx: number, user: User): Promise<void> {
    const resume: Resume | undefined = await this.resumeRepository.findByIdx(
      idx,
    );

    if (resume.user.userId !== user.userId) {
      throw new UnauthorizedException('본인의 이력서가 아닙니다');
    }

    if (validationNullORUndefined(resume)) {
      throw new NotFoundException('존재하지 않는 이력서입니다');
    }
    await this.resumeRepository.remove(resume);
  }
}
