import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { constants } from 'buffer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
@Module({
  imports: [TypeOrmModule.forFeature([User]),
  ConfigModule.forRoot({
    isGlobal: true, 
    envFilePath: '.env', 
  }),
  
  UsersModule,
    JwtModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], 
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'), 
        signOptions: { expiresIn: '3600s' },
      }),
      inject: [ConfigService], 
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,UsersService,JwtService,BcryptService],
  exports: [AuthService]
})
export class AuthModule {}