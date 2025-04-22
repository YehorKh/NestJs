
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class AuthRolesGuard implements CanActivate {
  private readonly logger = new Logger(AuthRolesGuard.name);

  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    // 1. Извлекаем токен
    const token = this.extractToken(request);
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    // 2. Верифицируем токен и устанавливаем пользователя
    try {
      request.user = await this.jwtService.verifyAsync(token);
      this.logger.debug(`Authenticated user: ${JSON.stringify(request.user)}`);
    } catch (e) {
      this.logger.error('Token verification failed', e.stack);
      throw new UnauthorizedException('Invalid token');
    }

    // 3. Проверяем роли
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const hasRole = requiredRoles.some(role => request.user?.roles?.includes(role));
    if (!hasRole) {
      throw new ForbiddenException(`Requires roles: ${requiredRoles.join(', ')}`);
    }

    return true;
  }

  private extractToken(request: any): string | null {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }
}