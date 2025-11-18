import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @MaxLength(250,{message:'El nombre debe ser menor o igual a 250 caracteres'})
  name:string;

  @IsString()
  @MaxLength(250,{message:'El apellido debe ser menor o igual a 250 caracteres'})
  surname:string;

  @IsString()
  @MaxLength(35,{message:'El role debe ser menor o igual a 35 caracteres'})
  role:string;

  @IsEmail()
  @MinLength(6,{message:'El correo electronico debe ser mayor o igual a 6 caracteres'})
  @MaxLength(250,{message:'El correo electronico debe ser menor o igual a 250 caracteres'})
  email:string;

  @IsString()
  @MinLength(6,{message:'La contraseña debe ser mayor o igual a 6 caracteres'})
  password:string;

  @IsString()
  _token: string;

  @IsOptional()
  user: any;
}
