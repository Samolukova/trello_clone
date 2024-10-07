import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Content of the comment',
    example: 'I will do it today!.',
  })
  @IsString()
  @IsNotEmpty({ message: 'Введите содержимое комментария' })
  content: string;
}
