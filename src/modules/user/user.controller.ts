import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, Req
} from "@nestjs/common";
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Request } from "express";

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
  ) {
    return this.userService.updateUser(+id, updateUserDto, req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Req() req: Request) {
    return this.userService.deleteUser(id, req.user.userId);
  }
}
