import {
  BadRequestException, ForbiddenException,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateColumnDto } from '../column/dto/create-column.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const { email, password } = dto;
    const existsUser = await this.getUserByEmail(email);
    if (existsUser) {
      throw new BadRequestException(
        'Пользователь с такой почтой уже существует',
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });
  }

  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });
    if (!user) {
      throw new NotFoundException('Пользователя не существует');
    }
    return user;
  }
  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email: email },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });
  }

  async updateUser(id: number, dto: UpdateUserDto, candidateId: number) {
    const user = await this.getUserById(id);
    if (!user) {
      throw new NotFoundException('Пользователя не существует');
    }
    if (user.id != candidateId) {
      throw new ForbiddenException('У вас нет прав на изменение данных');
    }
    const { email, password } = dto;

    let hashedPassword: string | undefined;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updateData: { email?: string; password?: string } = {};
    if (email) updateData.email = email;
    if (hashedPassword) updateData.password = hashedPassword;

    return this.prisma.user.update({
      where: { id: user.id },
      data: updateData,
    });
  }

  async deleteUser(id: number, candidateId: number) {
    const user = await this.getUserById(Number(id));
    if (!user) {
      throw new NotFoundException('Пользователя не существует');
    }
    if (user.id != candidateId) {
      throw new ForbiddenException('У вас нет прав на изменение данных');
    }
    await this.prisma.user.delete({
      where: { id: user.id },
    });
  }
}
