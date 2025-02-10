import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(userLoginDto: LoginUserDto): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
}
