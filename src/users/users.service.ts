import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(
      @InjectRepository(User) 
      private readonly userRepository: Repository<User>,
      private readonly jwtService: JwtService,
    ) {}

  async login({email, password}: CreateAuthDto) {
    const userAuth = await this.findOneByEmail(email);
    if(!userAuth) {throw new UnauthorizedException('Wrong user not found')};
    const passvalid = await bcryptjs.compare(password, userAuth.password)
    if(!passvalid) {throw new UnauthorizedException('Wrong password invalid')};
    const payload = {email: userAuth.email, role: userAuth.role, fullname: userAuth.name+' '+userAuth.surname }
    const token = await this.jwtService.signAsync(payload);
    return {token:token, user:payload};
  }

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.userRepository.findOne({where:{email: createUserDto.email}})
    if(userExists) {return {message: 'EL usuario ya existe'}};
    createUserDto.password = await bcryptjs.hash(createUserDto.password, 10);
    const newUser = await this.userRepository.save(createUserDto);
    return {message: 'Usuario registrado', user: newUser};
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({where: {email:email}})
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
