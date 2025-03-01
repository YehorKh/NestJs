import { IsString, IsArray, ArrayMinSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddProductImagesDto {
  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty()
  images: string[];
}