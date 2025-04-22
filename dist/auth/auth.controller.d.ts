import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { MailerService } from 'src/mailer/mailer.service';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { VerifyUserDto } from './dto/verify-user.dto';
export declare class AuthController {
    private authService;
    private readonly mailerService;
    constructor(authService: AuthService, mailerService: MailerService);
    signIn(userLoginDto: LoginUserDto): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
    register(createUserDto: RegisterUserDto): Promise<{
        message: string;
    }>;
    verify(verifyUserDto: VerifyUserDto): Promise<{
        error: string;
        message?: undefined;
    } | {
        message: string;
        error?: undefined;
    }>;
}
