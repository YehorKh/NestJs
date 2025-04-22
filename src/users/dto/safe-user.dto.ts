import { ApiProperty } from '@nestjs/swagger';

export class SafeUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  roles: string[];

  @ApiProperty()
  email: string;

  @ApiProperty()
  emailVerified: boolean;

  @ApiProperty()
  defaultShippingAddress?: string;

  @ApiProperty()
  phoneNumber?: string;
}