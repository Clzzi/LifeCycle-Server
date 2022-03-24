import { IsNotEmpty, IsString } from 'class-validator';

export class ResumeDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  company!: string;

  @IsNotEmpty()
  @IsString()
  stack!: string;

  @IsNotEmpty()
  @IsString()
  thumbnail!: string;

  @IsNotEmpty()
  @IsString()
  content!: string;
}
