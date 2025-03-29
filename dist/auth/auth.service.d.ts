import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { ConfigService } from '@nestjs/config';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { MailerService } from 'src/mailer/mailer.service';
import { VerificationService } from 'src/verification/verification.service';
import { VerifyUserDto } from './dto/verify-user.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    private readonly bcryptService;
    private readonly configService;
    private readonly mailerService;
    private readonly verificationService;
    constructor(usersService: UsersService, jwtService: JwtService, bcryptService: BcryptService, configService: ConfigService, mailerService: MailerService, verificationService: VerificationService);
    register(createUserDto: CreateUserDto): Promise<{
        message: string;
    }>;
    verify(verifyUserDto: VerifyUserDto): Promise<{
        error: string;
        message?: undefined;
    } | {
        message: string;
        error?: undefined;
    }>;
    signIn(loginUserDto: LoginUserDto): Promise<{
        access_token: string;
    }>;
}
