import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateColumnDto {
  @ApiProperty({
    description: 'Name of the column',
    example: 'To Do today',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
