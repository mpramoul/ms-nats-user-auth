import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthInterceptor } from '../config/auth.interceptor';

@Controller('users')
@UseInterceptors(AuthInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({cmd:'register_user'})
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern({cmd:'user_list'})
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern({cmd: 'user_list_one'})
  findOne(@Payload() data: any) {
    return this.usersService.findOne(+data.user_id);
  }

  @MessagePattern({cmd:'user_update'})
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @MessagePattern({cmd: 'user_delete'})
  remove(@Payload() data: any) {
    return this.usersService.remove(+data.user_id);
  }
}
