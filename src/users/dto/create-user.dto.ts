import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { IsPhoneNumber } from 'class-validator';
export class RegisterUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  defaultShippingAddress?: string;
  @ApiProperty()
  @IsOptional()
  @IsPhoneNumber(null) 
  phoneNumber?: string;
}
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  defaultShippingAddress?: string;
  @ApiProperty()
  @IsOptional()
  @IsPhoneNumber(null) 
  phoneNumber?: string;
  @ApiProperty()
  @IsOptional()
  roles?: string[];
}