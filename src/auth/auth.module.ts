import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UsersService } from 'src/users/users.service';
import { constants } from 'buffer';

@Module({
  imports: [UsersModule,
    JwtModule,
    JwtModule.register({
      global:true,
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '600s'}
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,UsersService,JwtService],
  exports: [AuthService]
})
export class AuthModule {}
