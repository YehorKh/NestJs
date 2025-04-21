import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateOrderDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  paymentIntentId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  trackingNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  userId?: number;
}