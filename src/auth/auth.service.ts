import { Injectable } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { RpcException } from '@nestjs/microservices';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(createAuthDto: CreateAuthDto) {
    const userdb = await this.userService.findUserOfEmail(createAuthDto.email);
    if(!userdb) {
      throw new RpcException({
        statusCode: 403,
        message: 'User Invalid',
        errors: []
      })
    }
    const passValid = await bcryptjs.compare(createAuthDto.password, userdb.password);
    if(!passValid) {
      throw new RpcException({
        statusCode: 403,
        message: 'Password Invalid',
        errors: [],
      })
    }
    const payload = {email: userdb.email, role: userdb.role, fullname: userdb.name+' '+userdb.surname};
    const token = await this.jwtService.signAsync(payload);
    return {message: 'User access', token: token, user: payload};
  }

  async register(createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
