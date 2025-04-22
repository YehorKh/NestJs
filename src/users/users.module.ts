import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { EmailVerification } from 'src/verification/entities/verification.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/role/roles.guard';
import { CartItem } from 'src/cart/entities/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]),TypeOrmModule.forFeature([EmailVerification]),TypeOrmModule.forFeature([CartItem])
,ConfigModule.forRoot({
    isGlobal: true, 
    envFilePath: '.env', 
  }),JwtModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], 
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'), 
        signOptions: { expiresIn: '3600s' },
      }),
      inject: [ConfigService], 
    }),], 
  controllers: [UsersController],
  providers: [UsersService,BcryptService,{
        provide: APP_GUARD,
        useClass: RolesGuard,
      },],
})
export class UsersModule {}
