import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class UpdateEmailDto {
  @ApiProperty({ example: 'new@example.com', description: 'New email address' })
  @IsEmail()
  email: string;
}