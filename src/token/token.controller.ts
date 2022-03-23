import { Body, Controller, Post } from '@nestjs/common';
import DataResponse from 'src/common/response/DataResponse';
import RemakeDto from './dto/remake.dto';
import { TokenService } from './token.service';

@Controller('/token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post('/refresh')
  async remakeToken(@Body() dto: RemakeDto) {
    const token: string = await this.tokenService.remakeAccessToken(dto);
    return DataResponse.dataSuccess('토큰이 재발급 되었습니다', token);
  }
}
