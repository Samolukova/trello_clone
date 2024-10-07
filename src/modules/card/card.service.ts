import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class CardService {
  constructor(private readonly prisma: PrismaService) {}

  async createCard(userId: number, dto: CreateCardDto, columnId: number,candidate: number) {
    const { title, description } = dto;
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

    const column = await this.prisma.column.findUnique({
      where: {
        id: columnId,
      },
    });

    if (!column) {
      throw new NotFoundException('Колонка не найдена');
    }
    return this.prisma.card.create({
      data: {
        title: title,
        description: description,
        columnId: columnId,
        userId: userId,
      },
    });
  }

  async getCardsByUserId(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        cards: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    return user.cards;
  }
  async getCardById(id: number) {
    const card = await this.prisma.card.findUnique({
      where: {
        id: id,
      },
    });
    if (!card) {
      throw new NotFoundException('Карточка не найдена');
    }
    return card;
  }
  async updateCard(
    userId: number,
    dto: UpdateCardDto,
    cardId: number,
    candidate: number,
  ) {
    const card = await this.getCardById(cardId);
    if (card.userId !== candidate) {
      throw new ForbiddenException(
        'У вас нет прав на изменение этого комментария',
      );
    }
    //в случае, если в url указан неверный id пользователя
    if (card.userId !== userId) {
      throw new ForbiddenException(
        'Эта карточка принадлежит другому прользователю"',
      );
    }
    return this.prisma.card.update({
      where: { id: cardId },
      data: {
        title: card.title || dto.title,
        description: card.description || dto.description,
      },
    });
  }
  async deleteCard(
    id: number,
    columnId: number,
    userId: number,
    candidate: number,
  ) {
    const card = await this.getCardById(id);
    if (card.userId != candidate) {
      throw new ForbiddenException(
        'У вас нет прав на изменение этого комментария',
      );
    }
    // Проверка, что карточка принадлежит тому пользователю, который указан в URL
    if (card.userId !== userId) {
      throw new ForbiddenException(
        'Эта карточка принадлежит другому прользователю"',
      );
    }
    //в случае, если в url указан неверный id группы
    if (card.columnId !== columnId) {
      throw new ForbiddenException('Эта карточка находится в другой колонке"');
    }
    return this.prisma.card.delete({
      where: { id: id },
    });
  }
}
