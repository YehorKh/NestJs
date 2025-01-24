import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PasswordService } from './password/password.service';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ UsersModule, JwtModule, AuthModule],
  controllers: [AppController,UsersController],
  providers: [AppService, UsersService,JwtService],
})
export class AppModule {}
