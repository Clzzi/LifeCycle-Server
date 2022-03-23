import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseParamPip implements PipeTransform<string> {
  async transform(value: string, metadata: ArgumentMetadata) {
    const val: number = parseInt(value, 10);

    if (isNaN(val)) {
      throw new BadRequestException('검증 오류입니다');
    }

    return val;
  }
}
