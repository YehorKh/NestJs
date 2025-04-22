import {
   CanActivate,
   ExecutionContext,
   Injectable,
   UnauthorizedException,
 } from '@nestjs/common';
 import { JwtService } from '@nestjs/jwt';
 import { Request } from 'express';
 import { ConfigService } from '@nestjs/config';
import { warn } from 'console';
import { GqlExecutionContext } from '@nestjs/graphql';
 @Injectable()
 export class AuthGuard implements CanActivate {
   constructor(private jwtService: JwtService,
      private readonly configService: ConfigService
   ) {}
 
   async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req || context.switchToHttp().getRequest();
     //const request = context.switchToHttp().getRequest();
     const token = this.extractTokenFromHeader(request);
     if (!token) {
       throw new UnauthorizedException();
     }
     try {
       const payload = await this.jwtService.verifyAsync(
         token,
         {
           secret: this.configService.get<string>('JWT_SECRET')
         }
       );
       request['user'] = payload;
     } catch {
       throw new UnauthorizedException();
     }

      
      return true;
   

   }
 
   private extractTokenFromHeader(request: Request): string | undefined {
     const [type, token] = request.headers.authorization?.split(' ') ?? [];
     return type === 'Bearer' ? token : undefined;
   }
 }