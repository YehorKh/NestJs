import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryImageDto {
  @IsString()
  @ApiProperty()
  name: string;
}
