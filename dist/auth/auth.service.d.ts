import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { ConfigService } from '@nestjs/config';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private readonly bcryptService;
    private readonly configService;
    constructor(usersService: UsersService, jwtService: JwtService, bcryptService: BcryptService, configService: ConfigService);
    signIn(loginUserDto: LoginUserDto): Promise<{
        access_token: string;
    }>;
}
