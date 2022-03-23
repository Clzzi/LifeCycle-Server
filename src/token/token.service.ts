import {
  BadRequestException,
  GoneException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import {
  JWT_ACCESS_SUBJECT,
  JWT_ISSUER,
  JWT_REFRESH_SUBJECT,
} from 'src/share/constants/token.constant';
import { IToken } from 'src/share/interfaces/IToken';
import { createJWTPayload } from 'src/share/utils/create.util';
import RemakeDto from './dto/remake.dto';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  public makeAccessToken(userId: string): string {
    const payload = {
      userId,
    };

    const option: JwtSignOptions = {
      expiresIn: this.configService.get('JWT_ACCESS_EXPIRE'),
      issuer: JWT_ISSUER,
      subject: JWT_ACCESS_SUBJECT,
    };

    return this.jwtService.sign(payload, option);
  }

  public makeRefreshToken(userId: string): string {
    const payload = createJWTPayload<string>(userId);
    console.log(payload);

    const option: JwtSignOptions = {
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRE'),
      issuer: JWT_ISSUER,
      subject: JWT_REFRESH_SUBJECT,
    };
    return this.jwtService.sign(payload, option);
  }

  public async remakeAccessToken(dto: RemakeDto): Promise<string> {
    const { iss, sub, userId }: IToken = await this.verifyToken(
      dto.refreshToken,
    );

    if (iss !== JWT_ISSUER && sub !== JWT_REFRESH_SUBJECT) {
      throw new UnauthorizedException('토큰이 위조되었습니다');
    }

    return this.makeAccessToken(userId);
  }

  async verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      switch (error.message) {
        case 'jwt must be provided':
          throw new BadRequestException('토큰이 전송되지 않았습니다.');
        case 'jwt malformed':
        case 'invalid token':
        case 'invalid signature':
          throw new UnauthorizedException('위조된 토큰입니다');
        case 'jwt expired':
          throw new GoneException('토큰이 만료되었습니다');
        default:
          Logger.error(error);
          throw new InternalServerErrorException('다시 시도해 주세요');
      }
    }
  }
}
