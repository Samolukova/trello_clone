import { PartialType } from '@nestjs/mapped-types';
import { CreateCardDto } from './create-card.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCardDto extends PartialType(CreateCardDto) {
  @ApiProperty({
    description: 'Title of the card (optional)',
    example: 'DTO for Swagger ',
    required: false,
  })
  @IsOptional()
  @IsString()
  name: string;
  @ApiProperty({
    description: 'Description of the card (optional)',
    example: 'Design a Swagger DTO using decorators',
    required: false,
  })
  @IsString()
  @IsOptional()
  description: string;
}
