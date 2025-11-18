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

  async findAll() {
    const users = await this.userService.find({select: ['id','name','surname','email','role']});
    return {users: users};
  }

  async findOne(user_id: number) {
    const oneUser = await this.userService.findOne({where:{id: user_id}, select:['id','name','surname','email','role']});
    if(!oneUser) {
      throw new RpcException({
        statusCode: 403,
        message: 'User not found',
        errors: [],
      })
    }
    return {user: oneUser};
  }

  async update(updateUserDto: UpdateUserDto) {
    const { user_id, _token, user, ...dataUpdate} = updateUserDto;
    const userdb = await this.userService.findOne({where:{id: user_id}});
    if(!userdb) {
      throw new RpcException({
        statusCode: 403,
        message: 'User not found',
        errors: [],
      })
    }
    if(updateUserDto.password) {
      dataUpdate.password = await bcryptjs.hash(updateUserDto.password, 10);
    }
    const user_updated = await this.userService.update(user_id, dataUpdate);
    return {
      id: updateUserDto.user_id,
      name: updateUserDto.name,
      surname: updateUserDto. surname,
      email: updateUserDto.email,
      role: updateUserDto.role,
      };
  }

  async remove(user_id: number) {
    const user = await this.userService.findOne({where:{id: user_id}});
    if(!user) {
      throw new RpcException({
        statusCode: 403,
        message: 'User not found',
        errors: [],
      })
    }
    const user_deleted = await this.userService.softDelete(user_id);
    return {message: 'this user has deleted', 
    user: user.id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    role: user.role,
    };
  }
}
