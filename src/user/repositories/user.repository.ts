import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public findByUserId(id: string): Promise<User | undefined> {
    return this.createQueryBuilder('user')
      .where('user.user_id = :id', { id })
      .getOne();
  }
}
