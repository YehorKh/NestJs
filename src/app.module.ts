import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PasswordService } from './password/password.service';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './role/roles.guard';
import { AuthGuard } from './auth/auth.guard';
import { jwtConstants } from './constant/constants';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [JwtModule,
      JwtModule.register({
        global:true,
        secret: jwtConstants.secret,
        signOptions: {expiresIn: '100s'}
      }), UsersModule, AuthModule],
  controllers: [AppController,UsersController,AuthController],
  providers: [{
    provide: APP_GUARD,
    useClass: AuthGuard, 
  }
  ,AppService,AuthService, UsersService,JwtService],
})
export class AppModule {}
