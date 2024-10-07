import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { LoginUserDto } from '../../user/dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: CreateUserDto): Promise<CreateUserDto> {
    return this.authService.registerUsers(dto);
  }
  @Post('login')
  login(@Body() dto: LoginUserDto) {
    return this.authService.loginUser(dto);
  }
}
