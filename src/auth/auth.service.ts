import { Body, Injectable, Post, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { ConfigService } from '@nestjs/config';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { MailerService } from 'src/mailer/mailer.service';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailVerification } from 'src/verification/entities/verification.entity';
import { Repository } from 'typeorm';
import { VerificationService } from 'src/verification/verification.service';
import { VerifyUserDto } from './dto/verify-user.dto';
@Injectable()
export class AuthService {
   constructor(

      private usersService: UsersService,
      private jwtService: JwtService,
      private readonly bcryptService : BcryptService,
      private readonly configService: ConfigService,
      private readonly mailerService: MailerService,
      private readonly verificationService: VerificationService,
   ) {}
      async register(createUserDto: CreateUserDto) {
         createUserDto.roles = ["user"]
         this.usersService.create(createUserDto)

         const code = await this.verificationService.generateCode(createUserDto.email);
         await this.mailerService.sendVerificationEmail(createUserDto.email, code);
         return { message: 'Verification code sent to email' };
   }
   async verify(verifyUserDto: VerifyUserDto) {
      const isValid = await this.verificationService.verifyCode(verifyUserDto.email, verifyUserDto.code);
      if (!isValid) {
         return { error: 'Invalid or expired code' };
      }

      return { message: 'Email verified successfully! You can now log in.' };
   }
   async signIn(loginUserDto: LoginUserDto): Promise<{ access_token: string }>  
   {
      const user = await this.usersService.findOneByName(loginUserDto.name);
      if (!user || !(await bcrypt.compare(loginUserDto.password, user.password))) {
         throw new UnauthorizedException("Wrong login or password");
      }
      if (!user.emailVerified) throw new UnauthorizedException('Email not verified. Please verify your email first.');
      
      
      const payload = { id: user.id, name: user.name,email:user.email,roles:user.roles, iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + 3600,phone: user.phoneNumber, address: user.defaultShippingAddress };
      
      return {
         access_token: await this.jwtService.signAsync(payload, { secret: this.configService.get<string>('JWT_SECRET') }),
      };
   }
}