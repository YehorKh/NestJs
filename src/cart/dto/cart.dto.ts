import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddToCartDto {
  @IsInt()
  @ApiProperty()
  productId: number;

  @IsInt()
  @Min(1)
  @ApiProperty()
  quantity: number;
}