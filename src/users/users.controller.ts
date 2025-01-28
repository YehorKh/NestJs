import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { User, UsersService } from './users.service';
import { Role } from '../constant/role.enum';
import { Roles } from 'src/role/roles.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../role/roles.guard';
@Controller('users')

export class UsersController {
   constructor(private readonly usersService: UsersService){}

   @UseGuards(AuthGuard,RolesGuard)
   @Get()
   @Roles(Role.Admin) 
   getUsers() {
      return this.usersService.findAll();
   }
   @Get('check')
   @UseGuards(AuthGuard)
   checkUser(@Req() request) {
   return request.user;
   }
}
