import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePhoneNumberDto, UpdateShippingAddressDto, UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
  
  @Patch(':id/shipping-address')
  
  async updateShippingAddress(
    @Param('id', ParseIntPipe) userId: number,
    @Body() updateShippingAddressDto: UpdateShippingAddressDto
  ): Promise<User> {
    return this.usersService.updateShippingAddress(
      userId,
      updateShippingAddressDto.address
    );
  }

  @Patch(':id/phone-number')
 
  async updatePhoneNumber(
    @Param('id', ParseIntPipe) userId: number,
    @Body() updatePhoneNumberDto: UpdatePhoneNumberDto
  ): Promise<User> {
    return this.usersService.updatePhoneNumber(
      userId,
      updatePhoneNumberDto.phoneNumber
    );
  }
}
