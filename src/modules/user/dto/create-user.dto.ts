import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';



export class CreateUserDto {
  @ApiProperty({
    description: "User's email address",
    example: 'example@mail.ru',
  })
  @IsNotEmpty({ message: 'Введите email' })
  @IsEmail({}, { message: 'Некорректный email' })
  email: string;

  @ApiProperty({
    description: 'User password (minimum length: 6 characters)',
    example: 'password123',
  })
  @IsNotEmpty({ message: 'Введите пароль' })
  @MinLength(6, { message: 'Минимальная длина пароля - 6 символов' })
  password: string;
}
