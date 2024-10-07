import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Injectable()
export class ColumnService {
  constructor(private readonly prisma: PrismaService) {}
  async createColumn(userId: number, dto: CreateColumnDto, candidate: number) {
    const name = dto.name;
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    if (userId != candidate) {
      throw new ForbiddenException('У вас нет прав для создания');
    }
    return this.prisma.column.create({
      data: {
        name,
        userId: userId,
      },
    });
  }

  async getColumnById(id: number) {
    const column = await this.prisma.column.findUnique({
      where: { id },
      include: {
        cards: true,
      },
    });

    if (!column) {
      throw new NotFoundException('Колонка не найдена');
    }

    return column;
  }

  async updateColumn(id: number, dto: UpdateColumnDto, candidate: number) {
    const column = await this.getColumnById(id);
    if (!column) {
      throw new NotFoundException('Колонка не найдена');
    }
    if (column.userId !== candidate) {
      throw new ForbiddenException(
        'У вас нет прав на изменение этого комментария',
      );
    }
    const updateData: { name?: string } = {};
    if (dto.name) {
      updateData.name = dto.name;
    }

    return this.prisma.column.update({
      where: { id: column.id },
      data: updateData,
    });
  }

  async deleteColumn(id: number, candidate: number) {
    const column = await this.getColumnById(id);
    if (!column) {
      throw new NotFoundException('Колонка не найдена');
    }
    if (column.userId !== candidate) {
      throw new ForbiddenException(
        'У вас нет прав на изменение этого комментария',
      );
    }
    return this.prisma.column.delete({
      where: { id: id },
    });
  }
  async getColumnsByUserId(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
      include: { columns: true },
    });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user.columns;
  }
}
