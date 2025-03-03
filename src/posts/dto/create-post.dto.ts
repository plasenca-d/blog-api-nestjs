import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @ApiProperty({
    description: 'The title of the post',
    example: 'NestJS Blogs API for Medium',
    type: String,
    required: true,
  })
  title: string;

  @IsString()
  @ApiProperty({
    description: 'The content of the post',
    example: 'This is the content of the post',
    type: String,
    required: true,
  })
  content: string;

  @IsUUID()
  @ApiProperty({
    description: 'The category of the post',
    example: 'random uuid',
    type: String,
    required: true,
  })
  categoryId: string;
}
