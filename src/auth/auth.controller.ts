import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({cmd:'login'})
  login(@Payload() createAuthDto: CreateAuthDto){
    return this.authService.login(createAuthDto);
  }

  @MessagePattern({cmd:'register'})
  create(@Payload() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
