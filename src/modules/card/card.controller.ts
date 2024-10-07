import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Patch,
  Req,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { JwtAuthGuard } from '../../guards/jwt-quard';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('users/:userId/columns/:columnId/cards')
@Controller('users/:userId/columns/:columnId/cards')
export class CardController {
  constructor(private readonly service: CardService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async createCard(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('columnId', ParseIntPipe) columnId: number,
    @Body() createCardDto: CreateCardDto,
    @Req() req: Request,
  ) {
    return this.service.createCard(userId, createCardDto, columnId,req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllCards(@Param('userId', ParseIntPipe) userId: number) {
    return this.service.getCardsByUserId(userId);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':idCard')
  async updateCard(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateCardDto: UpdateCardDto,
    @Param('columnId', ParseIntPipe) columnId: number,
    @Req() req: Request,
  ) {
    return this.service.updateCard(
      userId,
      updateCardDto,
      columnId,
      req.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':idCard')
  async deleteCard(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('columnId', ParseIntPipe) columnId: number,
    @Param('idCard', ParseIntPipe) idCard: number,
    @Req() req: Request,
  ) {
    return this.service.deleteCard(idCard, columnId, userId, req.user.userId);
  }
}
