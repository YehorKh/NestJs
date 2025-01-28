import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constant/constants';
import { Request } from 'express';
import { warn } from 'console';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
     console.error('Token not found in the request header');
     throw new UnauthorizedException('Token not found');
   }
   try {
    // Проверка валидности токена
    const payload = this.jwtService.verify(token);
    request.user = payload;
  } catch (err) {
    throw new UnauthorizedException('Токен недействителен или истёк');
  }
   try {
     const payload = await this.jwtService.verifyAsync(token, {
       secret: jwtConstants.secret,
     });
     console.log('Verified payload:', payload);

     request['user'] = payload;

   } catch (error) {
     console.error('Token verification failed:', error.message);
     throw new UnauthorizedException('Invalid token');
   }
  
    return true;
  }
 
  private extractTokenFromHeader(request: Request): string | undefined {
    console.log('Authorization header:', request.headers.authorization);
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}