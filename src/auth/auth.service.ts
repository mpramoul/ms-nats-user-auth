import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  
  login(createAuthDto: CreateAuthDto) {
    return this.userService.login(createAuthDto);
  }

  register(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

}
