import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class RegisterDto {
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  pw!: string;

  @IsNumber()
  @IsNotEmpty()
  generation!: number;
}
