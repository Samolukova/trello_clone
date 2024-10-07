import { PartialType } from '@nestjs/mapped-types';
import { CreateColumnDto } from './create-column.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class UpdateColumnDto extends PartialType(CreateColumnDto) {
  @ApiProperty({
    description: 'Name of the column (optional)',
    example: 'In Progress',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;
}
