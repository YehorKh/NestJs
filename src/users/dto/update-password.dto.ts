import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({ example: 'newSecurePassword123', description: 'New password' })
  @IsString()
  @MinLength(8)
  password: string;
}