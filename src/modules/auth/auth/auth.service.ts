import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { LoginUserDto } from '../../user/dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUsers(dto: CreateUserDto): Promise<CreateUserDto> {
    const isExistUser = await this.userService.getUserByEmail(dto.email);
    if (isExistUser) {
      throw new BadRequestException(
        'Пользователь с такой почтой уже существует',
      );
    }
    return await this.userService.createUser(dto);
  }

  async loginUser(
    dto: LoginUserDto,
  ): Promise<{ user: any; access_token: string }> {
    const existUser = await this.userService.getUserByEmail(dto.email);
    if (!existUser) {
      throw new NotFoundException('Пользователя с такой почтой не существует');
    }
    const validatePassword = await bcrypt.compare(
      dto.password,
      existUser.password,
    );
    if (!validatePassword) {
      throw new BadRequestException('Неверные данные');
    }
    const payload = { email: existUser.email };
    const token = this.jwtService.sign(payload);
    return {
      user: {
        id: existUser.id,
        email: existUser.email,
      },
      access_token: token,
    };
  }
}
