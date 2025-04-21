import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsPhoneNumber, IsString, Length } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateShippingAddressDto {
   @ApiProperty({
      example: '123 Main Street, Apt 4B, New York, NY 10001',
    })
    @IsNotEmpty()
    @IsString()
    @Length(10, 255)
    address: string;
 }
 
 export class UpdatePhoneNumberDto {
   @ApiProperty({
      example: '+79123456789',
      
    })
   @IsNotEmpty()
   @IsPhoneNumber(null)
   phoneNumber: string;
 }