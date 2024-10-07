import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from '../../../prisma.service';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    userId: number,
    cardId: number,
    createCommentDto: CreateCommentDto,
    candidate: number,
  ) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    if (userId !== candidate) {
      throw new ForbiddenException(
        'У вас нет прав на изменение этого комментария',
      );
    }
    const card = await this.prisma.card.findUnique({
      where: {
        id: cardId,
      },
    });
    if (!card) {
      throw new NotFoundException('Карточка не найдена');
    }
    return this.prisma.comment.create({
      data: {
        content: createCommentDto.content,
        userId: userId,
        cardId: cardId,
      },
    });
  }

  async getCommentsByCardId(cardId: number) {
    const card = await this.prisma.card.findUnique({
      where: {
        id: cardId,
      },
      include: {
        comments: true,
      },
    });
    if (!card) {
      throw new NotFoundException('Карточка не найдена');
    }
    return card.comments;
  }

  async getCommentById(id: number) {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: id,
      },
    });
    if (!comment) {
      throw new NotFoundException('Карточка не найдена');
    }
    return comment;
  }

  async updateComment(
    userId: number,
    commentId: number,
    cardId: number,
    updateCommentDto: UpdateCommentDto,
    candidate: number,
  ) {
    const comment = await this.getCommentById(commentId);
    if (comment.userId !== candidate) {
      throw new ForbiddenException(
        'У вас нет прав на изменение этого комментария',
      );
    }
    // Проверка, что карточка принадлежит тому пользователю, который указан в URL
    if (comment.userId !== userId) {
      throw new ForbiddenException(
        'Эта карточка принадлежит другому прользователю"',
      );
    }
    //в случае, если в url указан неверный id карточки
    if (comment.cardId !== cardId) {
      throw new ForbiddenException('Эта карточка находится в другой колонке"');
    }
    return this.prisma.comment.update({
      where: { id: commentId },
      data: {
        content: updateCommentDto.content || comment.content,
      },
    });
  }

  async deleteComment(
    userId: number,
    cardId: number,
    commentId: number,
    candidate: number,
  ) {
    const comment = await this.getCommentById(commentId);
    if (comment.userId !== candidate) {
      throw new ForbiddenException(
        'У вас нет прав на изменение этого комментария',
      );
    }
    // Проверка, что карточка принадлежит тому пользователю, который указан в URL
    if (comment.userId !== userId) {
      throw new ForbiddenException(
        'Эта карточка принадлежит другому прользователю"',
      );
    }
    //в случае, если в url указан неверный id карточки
    if (comment.cardId !== cardId) {
      throw new ForbiddenException('Эта карточка находится в другой колонке"');
    }
    return this.prisma.comment.delete({
      where: { id: commentId },
    });
  }
}
