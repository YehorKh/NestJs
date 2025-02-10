import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'Имя пользователя' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'user@example.com', description: 'Email пользователя' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password', description: 'Пароль (мин. 6 символов)' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: ['admin', 'user'], description: 'Роли пользователя', required: false })
  @IsOptional()
  roles?: string[];
}