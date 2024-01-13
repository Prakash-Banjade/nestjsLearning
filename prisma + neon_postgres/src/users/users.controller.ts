import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Role } from './users.interface';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  // const usersService = new UsersService(); // it's automatically handled by Nest for us
  constructor(private readonly usersService: UsersService) {} // injecting the service

  @Get() // GET /users?role=[value]
  findAll(@Query('role') role?: Role) {
    return this.usersService.findAll(role);
  }

  @Get(':id') // GET /users/:id
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body(ValidationPipe) data: CreateUserDto) {
    return this.usersService.create(data);
  }

  @Patch(':id') // PATCH /users/:id
  update(@Param('id') id: string, @Body(ValidationPipe) data: UpdateUserDto) {
    return this.usersService.update({ id, ...data });
  }

  @Delete(':id') // DELETE /users/:id
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
