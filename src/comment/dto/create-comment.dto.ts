import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, Min, Max } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateCommentDto {
  @ApiProperty({ example: 101 })
  @IsInt()
  productId: number;
  @ApiProperty({ example: 5, minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;
  @ApiProperty({ example: 'This product is amazing!' })
  @IsString()
  @IsNotEmpty()
  content: string;
  userId: number;  
}
