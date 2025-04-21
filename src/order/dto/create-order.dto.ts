import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ example: '123 Main St, New York, USA' })
  @IsNotEmpty()
  @IsString()
  shippingAddress: string;

  @ApiProperty({ example: '+1234567890' })
  @IsNotEmpty()
  @IsPhoneNumber()
  contactPhone: string;
}