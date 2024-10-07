import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from '../../../guards/jwt-quard';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('/users/:userId/cards/:cardId/comments')
@Controller('/users/:userId/cards/:cardId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('cardId', ParseIntPipe) cardId: number,
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: Request,
  ) {
    return this.commentService.create(
      userId,
      cardId,
      createCommentDto,
      req.user.userId,
    );
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async getCommentsByCardId(@Param('cardId', ParseIntPipe) cardId: number) {
    return this.commentService.getCommentsByCardId(cardId);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getCommentById(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.getCommentById(id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':commentId')
  async updateComment(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Param('cardId', ParseIntPipe) cardId: number,
    @Body() updateCommentDto: UpdateCommentDto,
    @Req() req: Request,
  ) {
    return this.commentService.updateComment(
      userId,
      commentId,
      cardId,
      updateCommentDto,
      req.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Param('cardId', ParseIntPipe) cardId: number,
    @Req() req: Request,
  ) {
    return this.commentService.deleteComment(
      userId,
      cardId,
      commentId,
      req.user.userId,
    );
  }
}
