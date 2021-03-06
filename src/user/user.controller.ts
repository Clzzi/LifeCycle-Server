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
import { LoginDto } from './dto/login.dto';
import RegisterDto from './dto/register.dto';
import {
  UpdateMyGenerationDto,
  UpdateMyPasswordDto,
} from './dto/updateInfo.dto';
import { User } from './entities/user.entity';
import { ILoginResponse } from './responses/login.response';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:userId')
  async getUserByUserId(
    @Param('userId') userId: string,
  ): Promise<DataResponse<User>> {
    const userData: User = await this.userService.getUserByUserID(userId);
    return DataResponse.dataSuccess('userId로 조회 성공', userData);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getUserByToken(@Token() user: User): Promise<DataResponse<User>> {
    const userAndResume = await this.userService.getUserAndResumeByUserID(
      user.userId,
    );
    return DataResponse.dataSuccess('정보조회 성공', userAndResume);
  }

  @HttpCode(200)
  @Post('/register')
  async register(@Body() dto: RegisterDto): Promise<Response> {
    await this.userService.register(dto);

    return Response.success('회원가입에 성공했어요');
  }

  @Post('/login')
  async login(@Body() dto: LoginDto): Promise<DataResponse<ILoginResponse>> {
    const loginRes: ILoginResponse = await this.userService.login(dto);
    return DataResponse.dataSuccess('로그인 성공', loginRes);
  }

  @UseGuards(AuthGuard)
  @Put('/update/generation')
  async updateGeneration(
    @Body() dto: UpdateMyGenerationDto,
    @Token() user: User,
  ): Promise<Response> {
    await this.userService.updateMyGeneration(dto, user);
    return Response.success('기수 수정 성공');
  }

  @UseGuards(AuthGuard)
  @Put('/update/password')
  async updatePassword(
    @Body() dto: UpdateMyPasswordDto,
    @Token() user: User,
  ): Promise<Response> {
    await this.userService.updateMyPassword(dto, user);
    return Response.success('비번 수정 성공');
  }

  @UseGuards(AuthGuard)
  @Delete('/')
  async deleteMyAccount(@Token() user: User): Promise<Response> {
    await this.userService.deleteMyAccount(user);
    return Response.success('계정 탈퇴 성공');
  }
}
