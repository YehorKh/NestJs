import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartItem } from './entities/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[ ConfigModule.forRoot({
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
  TypeOrmModule.forFeature([CartItem]),TypeOrmModule.forFeature([Product])],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService]
})
export class CartModule {}
