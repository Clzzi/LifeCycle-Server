import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public findByUserIdIncludePw(id: string): Promise<User | undefined> {
    return this.createQueryBuilder()
      .select('usr.user_id', 'userId')
      .addSelect('usr.generation', 'generation')
      .addSelect('usr.pw', 'pw')
      .addSelect('usr.name', 'name')
      .from(User, 'usr')
      .where('usr.user_id = :id', { id })
      .getRawOne();
  }

  public findByUserId(id: string): Promise<User | undefined> {
    return this.createQueryBuilder()
      .select('usr.user_id', 'userId')
      .addSelect('usr.generation', 'generation')
      .addSelect('usr.name', 'name')
      .from(User, 'usr')
      .where('usr.user_id = :id', { id })
      .getRawOne();
  }

  public findUserAndResumeByUserId(id: string): Promise<User | undefined> {
    return this.createQueryBuilder('user')
      .leftJoinAndSelect('user.resume', 'resume')
      .where('user.user_id = :userId', { userId: id })
      .getOne();
  }
}
