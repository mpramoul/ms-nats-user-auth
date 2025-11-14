import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async verifyEmailUser(email: string) {
    return await this.userRepository.findOne({where: {email: email}});
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({where: {email: createUserDto.email}});
    if(user) { throw new RpcException({
      statusCode: 403,
      message: 'User already exists',
      errors:['Other messages personalized']})
    }
    createUserDto.password = await bcryptjs.hash(createUserDto.password, 10);
    const newUser = await this.userRepository.save(createUserDto);
    return {
      message: 'El usuario ha sido registrado correctamente',
      user: newUser
    };
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
