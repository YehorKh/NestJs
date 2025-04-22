import { Controller, Get, Post, Body, Patch, Request,Param, Delete, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePhoneNumberDto, UpdateShippingAddressDto, UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { SafeUserDto } from './dto/safe-user.dto';
import { Roles } from 'src/role/roles.decorator';
import { Role } from 'src/role/roles.enum';
import { UpdateNameDto } from './dto/update-name.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { RolesGuard } from 'src/role/roles.guard';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @ApiBearerAuth()
  @Roles(Role.Admin,Role.User)
  @UseGuards(AuthGuard,RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch()
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto);
  }
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
  @ApiBearerAuth()
    @UseGuards(AuthGuard)
  @Patch('/shipping-address')
  async updateShippingAddress(
    @Request() req,
    @Body() updateShippingAddressDto: UpdateShippingAddressDto
  ): Promise<User> {
    return this.usersService.updateShippingAddress(
      req.user.id,
      updateShippingAddressDto.address
    );
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch('/phone-number')
  async updatePhoneNumber(
    @Body() updatePhoneNumberDto: UpdatePhoneNumberDto,
    @Request() req,
  ): Promise<User> {
    return this.usersService.updatePhoneNumber(
      req.user.id,
      updatePhoneNumberDto.phoneNumber
    );
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch('name')
  async updateName(
    @Request() req,
    @Body() updateNameDto: UpdateNameDto
  ): Promise<User> {
    return this.usersService.updateName(req.user.id, updateNameDto.name);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch('email')
  async updateEmail(
    @Request() req,
    @Body() updateEmailDto: UpdateEmailDto
  ): Promise<User> {
    return this.usersService.updateEmail(req.user.id, updateEmailDto.email);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch('password')
  async updatePassword(
    @Request() req,
    @Body() updatePasswordDto: UpdatePasswordDto
  ): Promise<User> {
    return this.usersService.updatePassword(
      req.user.id,
      updatePasswordDto.password
    );
  }
}
