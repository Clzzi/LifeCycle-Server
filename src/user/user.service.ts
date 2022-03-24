import { User } from './entities/user.entity';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { TokenService } from 'src/token/token.service';
import RegisterDto from './dto/register.dto';
import { validationNullORUndefined } from 'src/share/utils/validation.util';
import { LoginDto } from './dto/login.dto';
import { ILoginResponse } from 'src/user/responses/login.response';
import {
  UpdateMyGenerationDto,
  UpdateMyPasswordDto,
} from './dto/updateInfo.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
  ) {}

  public async register(dto: RegisterDto): Promise<void> {
    const user: User | undefined = await this.userRepository.findByUserId(
      dto.userId,
    );

    if (validationNullORUndefined(user)) {
      throw new ForbiddenException('중복된 계정 입니다.');
    }

    await this.userRepository.save(dto);
  }

  public async login(dto: LoginDto): Promise<ILoginResponse> {
    const user: User | undefined = await this.userRepository.findByUserId(
      dto.id,
    );

    if (validationNullORUndefined(dto)) {
      throw new UnauthorizedException('id 또는 pw가 일치하지 않습니다');
    }

    const token: string = this.tokenService.makeAccessToken(user.userId);
    const refreshToken: string = this.tokenService.makeRefreshToken(
      user.userId,
    );

    return {
      user,
      token,
      refreshToken,
    };
  }

  public async updateMyGeneration(
    dto: UpdateMyGenerationDto,
    user: User,
  ): Promise<void> {
    this.userRepository.merge(user, {
      generation: dto.generation,
    });
    await this.userRepository.save(user);
  }

  public async updateMyPassword(
    dto: UpdateMyPasswordDto,
    user: User,
  ): Promise<void> {
    this.userRepository.merge(user, {
      pw: dto.pw,
    });
    await this.userRepository.save(user);
  }

  public async deleteMyAccount(user: User): Promise<void> {
    await this.userRepository.remove(user);
  }

  public getUserByUserID(userId: string): Promise<User> {
    return this.userRepository.findByUserId(userId);
  }
}
