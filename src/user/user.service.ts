import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserByUserID(userId: string): Promise<User> {
    return this.userRepository.findByUserId(userId);
  }
}
