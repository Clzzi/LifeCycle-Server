import { EntityRepository, Repository } from 'typeorm';
import { Resume } from '../entities/resume.entity';

@EntityRepository(Resume)
export class ResumeRepository extends Repository<Resume> {
  public findByIdx(idx: number): Promise<Resume | undefined> {
    return this.createQueryBuilder('resume')
      .where('resume.idx = :idx', { idx })
      .getOne();
  }
}
