import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateAuthDto {
  @IsEmail()
  @MinLength(6,{message:'El correo electronico debe ser mayor o igual a 6 caracteres'})
  @MaxLength(250,{message:'El correo electronico debe ser menor o igual a 250 caracteres'})
  email:string;

  @IsString()
  @MinLength(6,{message:'La contraseña debe ser mayor o igual a 6 caracteres'})
  password:string;
}
