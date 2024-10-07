import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty({
    description: "User's email address",
    example: 'example@mail.ru',
  })
  @IsNotEmpty({ message: 'Введите email' })
  @IsEmail({}, { message: 'Некорректный email' })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'User password (minimum length: 6 characters)',
    example: 'password123',
  })
  @IsNotEmpty({ message: 'Введите пароль' })
  password: string;

  @ApiProperty({
    description: 'Authentication token',
    example: 'your-token-here',
  })
  @IsNotEmpty({ message: 'Введите токен' })
  token: string;
}
