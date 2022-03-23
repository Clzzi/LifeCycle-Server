import { IsNotEmpty } from 'class-validator';

export default class RemakeDto {
  @IsNotEmpty()
  refreshToken: string;
}
