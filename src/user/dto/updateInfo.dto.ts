import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateMyGenerationDto {
  @IsNumber()
  @IsNotEmpty()
  generation!: number;
}

export class UpdateMyPasswordDto {
  @IsString()
  @IsNotEmpty()
  pw!: string;
}
