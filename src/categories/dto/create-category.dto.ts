import { IsHexColor, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsHexColor()
  color: string;
}
