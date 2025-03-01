import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersService } from './users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersController } from './users/users.controller';
import { BcryptService } from './bcrypt/bcrypt.service';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { Product } from './products/entities/product.entity';
import { CartItem } from './cart/entities/cart.entity';
import { CartService } from './cart/cart.service';
import { ProductImage } from './products/entities/product-images.entity';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { UploadController } from './upload/upload.controller';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { UploadService } from './upload/upload.service';
import { ProductImageService } from './products/product-image/product-image.service';
import { UploadModule } from './upload/upload.module';





@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, 
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'mysql',
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_NAME'),
      entities: [User,Product,CartItem,ProductImage],
      synchronize: true,
    }),
  }),
  TypeOrmModule.forFeature([User]),TypeOrmModule.forFeature([Product]),TypeOrmModule.forFeature([CartItem]),TypeOrmModule.forFeature([ProductImage]),
  UsersModule, JwtModule, AuthModule, ProductsModule, CartModule, CloudinaryModule, UploadModule],
  controllers: [AppController,UsersController, UploadController],
  providers: [AppService,UsersService,JwtService,BcryptService,CartService,CloudinaryService, UploadService,ProductImageService],
  
})
export class AppModule {}
