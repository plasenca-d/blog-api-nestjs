import { IsOptional, IsPositive, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class PaginationDto {
  @Transform(({ value }) => Number(value))
  @IsPositive()
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  page?: number;

  @Transform(({ value }) => Number(value))
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  limit?: number;
}
