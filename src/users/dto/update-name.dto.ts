import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class UpdateNameDto {
  @ApiProperty({ example: 'John Doe', description: 'New user name' })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;
}