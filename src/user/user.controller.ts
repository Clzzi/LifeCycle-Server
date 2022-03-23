import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import DataResponse from 'src/common/response/DataResponse';
import Response from 'src/common/response/response';
import { LoginDto } from './dto/login.dto';
import RegisterDto from './dto/register.dto';
import { User } from './entities/user.entity';
import LoginResponseData from './responses/loginRes.dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(200)
  @Get('/:userId')
  async getUserByUserId(
    @Param('userId') userId: string,
  ): Promise<DataResponse<User>> {
    const userData = await this.userService.getUserByUserID(userId);
    return DataResponse.dataSuccess('userId로 조회 성공', userData);
  }

  @HttpCode(200)
  @Post('/register')
  async register(@Body() dto: RegisterDto): Promise<Response> {
    await this.userService.register(dto);

    return Response.success('회원가입에 성공했어요');
  }

  @HttpCode(200)
  @Post('/login')
  async login(@Body() dto: LoginDto): Promise<DataResponse<LoginResponseData>> {
    const loginRes: LoginResponseData = await this.userService.login(dto);
    return DataResponse.dataSuccess('로그인 성공', loginRes);
  }
}
