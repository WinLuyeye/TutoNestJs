import {
  Controller,
  HttpCode,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { User } from 'types/userTypes';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @HttpCode(200)
  findAll(): User[] {
    return this.usersService.findAll();
  }
  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string): User {
    return this.usersService.findOne(id);
  }
  @Post()
  @HttpCode(201)
  create(@Body() user: User): User {
    return this.usersService.create(user);
  }
  @Patch(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() user: User): User {
    return this.usersService.update(id, user);
  }
  @Delete(':id')
  @HttpCode(200)
  delete(@Param('id') id: string): string {
    return this.usersService.delete(id);
  }
}
