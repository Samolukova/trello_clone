import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ColumnService } from './column.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { JwtAuthGuard } from '../../guards/jwt-quard';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('users/:userId/columns')
@Controller('users/:userId/columns')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createColumn(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createColumnDto: CreateColumnDto,
    @Req() req: Request,
  ) {
    return this.columnService.createColumn(
      userId,
      createColumnDto,
      req.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getColumnsByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.columnService.getColumnsByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':columnId')
  async updateColumn(
    @Param('columnId', ParseIntPipe) columnId: number,
    @Body() updateColumnDto: UpdateColumnDto,
    @Req() req: Request,
  ) {
    return this.columnService.updateColumn(
      columnId,
      updateColumnDto,
      req.user.userId,
    );
  }


  @UseGuards(JwtAuthGuard)
  @Delete(':columnId')
  async deleteColumn(
    @Param('columnId', ParseIntPipe) columnId: number,
    @Req() req: Request,
  ) {
    return this.columnService.deleteColumn(columnId, req.user.userId);
  }
}
