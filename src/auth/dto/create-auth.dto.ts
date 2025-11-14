import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateAuthDto {
  @IsString()
  @IsEmail()
  @MinLength(6, {message: 'Correo electronico debe ser mayor ó igual a 6 caracteres'})
  @MaxLength(256, {message: 'Correo electronico debe ser menor ó igual a 250 caracteres'})
  email: string;

  @IsString()
  @MinLength(6, {message: 'Password debe ser mayor ó igual a 6 caracteres'})
  password: string;
}
