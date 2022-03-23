import { IsNotEmpty } from 'class-validator';

export default class RegisterDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  pw: string;

  @IsNotEmpty()
  generation: number;
}
