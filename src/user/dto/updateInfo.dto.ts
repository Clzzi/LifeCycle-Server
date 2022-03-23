import { IsNotEmpty } from 'class-validator';

export class updateInfoDto {
  @IsNotEmpty()
  accessToken!: string;

  @IsNotEmpty()
  pw!: string;

  @IsNotEmpty()
  generation!: number;

  @IsNotEmpty()
  name!: string;
}
