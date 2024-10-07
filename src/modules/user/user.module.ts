import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ColumnService } from '../column/column.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtService, ColumnService],
  exports: [UserService],
})
export class UserModule {}
