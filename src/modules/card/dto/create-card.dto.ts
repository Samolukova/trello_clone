import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty({
    description: 'Title of the card',
    example: 'DTO for Swagger ',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Description of the card',
    example: 'Design a Swagger DTO using decorators',
  })
  @IsString()
  @IsOptional()
  description: string;
}
