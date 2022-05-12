import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IToken } from 'src/share/interfaces/IToken';
import { validationNullORUndefined } from 'src/share/utils/validation.util';
import { TokenService } from 'src/token/token.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const token: string = req.headers['authorization'];
    if (validationNullORUndefined(token)) {
      throw new BadRequestException('토큰이 없어요');
    }

    const payload: IToken = await this.tokenService.verifyToken(token);
    const user: User | undefined =
      await this.userService.getUserAndResumeByUserID(payload.userId);

    if (validationNullORUndefined(user)) {
      throw new UnauthorizedException('유저가 존재하지 않아요');
    }

    req.user = user;
    return true;
  }
}
