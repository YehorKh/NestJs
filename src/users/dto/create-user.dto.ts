import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: 'user' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: ['admin', 'user'], required: false })
  @IsOptional()
  roles?: string[];
}