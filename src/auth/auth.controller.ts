import {
   Body,
   Controller,
   Get,
   HttpCode,
   HttpStatus,
   Post,
   Request,
   UseGuards
 } from '@nestjs/common';
 import { AuthGuard } from './auth.guard';
 import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '../role/roles.guard';
import { Role } from '../role/roles.enum';
import { Roles } from 'src/role/roles.decorator';
@Controller('auth')
export class AuthController {
   constructor(private authService: AuthService) {}
   @HttpCode(HttpStatus.OK)
   @Post('login')
   signIn(@Body() userLoginDto: LoginUserDto) {
   return this.authService.signIn(userLoginDto);
   }
   @ApiBearerAuth()
   @UseGuards(AuthGuard)
   @Get('profile')
   getProfile(@Request() req) {
     return req.user;
   }
}