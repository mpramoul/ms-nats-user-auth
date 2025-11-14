import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @MinLength(2, {message: 'Nombre debe ser mayor ó igual a 2 caracteres'})
  @MaxLength(256, {message: 'Nombre debe ser menor ó igual a 250 caracteres'})
  name: string;
  @IsString()
  @MinLength(2, {message: 'Apellido debe ser mayor ó igual a 2 caracteres'})
  @MaxLength(256, {message: 'Apellido debe ser menor ó igual a 250 caracteres'})
  surname: string;
  @IsString()
  @IsEmail()
  @MinLength(6, {message: 'Correo electronico debe ser mayor ó igual a 6 caracteres'})
  @MaxLength(256, {message: 'Correo electronico debe ser menor ó igual a 250 caracteres'})
  email: string;
  @IsString()
  @MinLength(6, {message: 'Password debe ser mayor ó igual a 6 caracteres'})
  password: string;
  @IsString()
  @MaxLength(35, {message: 'Rol debe ser mayor ó igual a 35 caracteres'})
  role: string;

  @IsString()
  _token: string;
  @IsOptional()
  user:any;
}
