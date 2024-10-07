import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @ApiProperty({
    description: 'Content of the comment (optional)',
    example: 'I will do it today!',
    required: false,
  })
  @IsString()
  @IsOptional()
  description: string;
}
