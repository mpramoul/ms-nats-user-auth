import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcryptjs from 'bcryptjs';
import { CreateAuthDto } from './dto/create-auth.dto';
import { RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    ) {}

  async login(createAuthDto: CreateAuthDto) {
    const userAuth = await this.userService.verifyEmailUser(createAuthDto.email);
    if(!userAuth){
      throw new RpcException({
      statusCode: 403,
      message: 'User already exists',
      errors:['Other messages personalized']})
      };
    const passValid = await bcryptjs.compare(createAuthDto.password, userAuth.password);
    if(!passValid){
      throw new RpcException({
      statusCode: 403,
      message: 'Wrong password',
      errors:['Other messages personalized']})
      };
    //Generacion del token
    const payload = {email: userAuth.email, role: userAuth.role, full_name: userAuth.name+' '+userAuth.surname };
    const token = await this.jwtService.signAsync(payload);

    return {message: 'User access successfully', token: token, user: payload};
  }

  async register(createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }
}