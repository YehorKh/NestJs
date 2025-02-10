import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { ConfigService } from '@nestjs/config';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
   constructor(
      private usersService: UsersService,
      private jwtService: JwtService,
      private readonly bcryptService : BcryptService,
      private readonly configService: ConfigService
   ) {}
   async signIn(loginUserDto: LoginUserDto): Promise<{ access_token: string }>  
   {
      const user = await this.usersService.findOneByName(loginUserDto.name);
      if (!user || !(await bcrypt.compare(loginUserDto.password, user.password))) {
         throw new UnauthorizedException("Wrong login or password");
      }
      
      
      const payload = { sub: user.id, name: user.name,roles:user.roles, iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + 3600 };
      
      return {
         access_token: await this.jwtService.signAsync(payload, { secret: this.configService.get<string>('JWT_SECRET') }),
      };
   }
}