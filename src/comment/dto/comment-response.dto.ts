import { ApiProperty } from '@nestjs/swagger';

export class CommentResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  content: string;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  date: Date;

  @ApiProperty({
    example: { id: 1, name: 'John Doe' },
  })
  user: { id: number; name: string };

  @ApiProperty({
    example: { id: 100, name: 'Product Name' },
  })
  product: { id: number; name: string };
}
