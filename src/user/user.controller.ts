import { Controller, Get, Param } from '@nestjs/common';
import DataResponse from 'src/common/response/DataResponse';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:userId')
  async getUserByUserId(
    @Param('userId') userId: string,
  ): Promise<DataResponse<User>> {
    const userData = await this.userService.getUserByUserID(userId);
    return DataResponse.dataSuccess('userId로 조회 성공', userData);
  }
}
