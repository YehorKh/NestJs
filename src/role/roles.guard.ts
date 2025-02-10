import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './roles.enum';
import { ROLES_KEY } from './roles.decorator';
import { warn } from 'console';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
   const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
     context.getHandler(),
     context.getClass(),
   ]);
 
   const request = context.switchToHttp().getRequest();
   console.log('User in RolesGuard:', request.user); 
 
   const { user } = request;
   if (!user || !user.roles) {
     console.error('User or roles not found');
     return false; 
   }
 
   const hasRole = requiredRoles.some((role) => user.roles.includes(role));
   console.log('Has required role:' ,hasRole);
 
   return hasRole;
 }
}