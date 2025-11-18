import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { RpcException } from '@nestjs/microservices';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}
  
  async login(createAuthDto: CreateAuthDto) {
    const UserAuth = await this.userService.findOneByEmail(createAuthDto.email);
    if(!UserAuth){
      throw new RpcException({
        statusCode: 403,
        message:"El usuario NO existe",
        errors:[]
      })
    }
    const userPassword = await bcryptjs.compare(createAuthDto.password,UserAuth.password);
    if(!userPassword){
      throw new RpcException({
        statusCode: 403,
        message:"La contraseña es incorrecta",
        errors:[]
      })
    }

    const payload = {email: UserAuth.email, role: UserAuth.role , full_name: UserAuth.name+' '+UserAuth.surname};
    const token = await this.jwtService.signAsync(payload);

    return {
      token: token,
      user: payload,
    }
  }

  async register(createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

}
