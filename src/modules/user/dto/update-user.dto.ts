import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: "User's email address",
    example: 'example@mail.ru',
    required: false,
  })
  @IsEmail({}, { message: 'Некорректный email' })
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'User password (minimum length: 6 characters)',
    example: 'password123',
    required: false,
  })
  @IsOptional()
  @MinLength(6, { message: 'Минимальная длина пароля - 6 символов' })
  password?: string;
}
