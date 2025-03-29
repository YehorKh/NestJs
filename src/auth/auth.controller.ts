import {
   Body,
   Controller,
   Get,
   HttpCode,
   HttpStatus,
   Param,
   Post,
   Query,
   Request,
   UseGuards
 } from '@nestjs/common';
 import { AuthGuard } from './auth.guard';
 import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';
import { RolesGuard } from '../role/roles.guard';
import { Role } from '../role/roles.enum';
import { Roles } from 'src/role/roles.decorator';
import { MailerService } from 'src/mailer/mailer.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { warn } from 'console';
import { VerifyUserDto } from './dto/verify-user.dto';
@Controller('auth')
export class AuthController {
   constructor(private authService: AuthService,
    private readonly mailerService: MailerService
   ) {}
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

   @Post("register")
   register(@Body() createUserDto: CreateUserDto) {
      return this.authService.register(createUserDto);
    }

  @Post('verify')
  // @ApiQuery({ 
  //   name: 'email', 
  //   type: String, 
  // })
  // @ApiQuery({ 
  //   name: 'code', 
  //   type: String, 
  // })
  async verify(@Body() verifyUserDto: VerifyUserDto) {
    
    return this.authService.verify(verifyUserDto);
  }
}