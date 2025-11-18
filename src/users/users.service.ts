import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) 
    private readonly userService: Repository<User>
    
    ) {}

  async findUserOfEmail(email: string) {
    return await this.userService.findOne({where:{email: email}});
  }

  async create(createUserDto: CreateUserDto) {
    const userdb = await this.findUserOfEmail(createUserDto.email);
    if(userdb) {
      throw new RpcException({
        statusCode: 403,
        message: 'User already exists',
        errors: ['User is not characters valid'],
      })
    }
    createUserDto.password = await bcryptjs.hash(createUserDto.password, 10);
    const newUser = await this.userService.save(createUserDto);
    return {message: 'User created successfully', user: newUser};
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
