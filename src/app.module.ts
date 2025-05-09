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

import { ProductImageService } from './product-image/product-image.service';
import { MinioModule } from 'nestjs-minio-client';

import { ContentService } from './content/content.service';
import { PaymentsModule } from './payments/payments.module';
import { AttributeModule } from './attribute/attribute.module';

import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { Attribute } from './attribute/entities/attribute.entity';
import { ProductAttributeValue } from './product-attribute-value/entities/product-attribute-value.entity';
import { CategoryAttribute } from './category-attribute/entities/category-attribute.entity';
import { MinioService } from 'nestjs-minio-client';

import { ProductAttributeValueService } from './product-attribute-value/product-attribute-value.service';
import { ProductAttributeValueController } from './product-attribute-value/product-attribute-value.controller';
import { ProductAttributeValueModule } from './product-attribute-value/product-attribute-value.module';
import { CategoryImageService } from './category-image/category-image.service';
import { CategoryImageModule } from './category-image/category-image.module';
import { CategoryImage } from './category-image/entity/category-image.entity';
import { CategoryImageController } from './category-image/category-image.controller';
import { ProductImageController } from './product-image/product-image.controller';
import { MailerService } from './mailer/mailer.service';
import { VerificationService } from './verification/verification.service';
import { EmailVerification } from './verification/entities/verification.entity';
import { CommentService } from './comment/comment.service';
import { CommentModule } from './comment/comment.module';
import { Comment } from './comment/entities/comment.entity';
import { Order } from './order/entities/order.entity';
import { OrderItem } from './order/entities/orderitem.entity';
import { Payment } from './payments/entities/payment.enitiy';
import { OrdersService } from './order/order.service';
import { OrdersController } from './order/order.controller';
import { StripeService } from './stripe/stripe.service';
import { PaymentsService } from './payments/payments.service';
import { StripeModule } from './stripe/stripe.module';
import { OrdersModule } from './order/order.module';
import { PaymentsController } from './payments/payments.controller';
import { RolesGuard } from './role/roles.guard';
import { APP_GUARD } from '@nestjs/core';



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
      entities: [User,OrderItem,Payment,Order,Product,CartItem,ProductImage,Category,Attribute,ProductAttributeValue,CategoryAttribute,CategoryImage,EmailVerification,Comment],
      synchronize: true,
    }),
  }),
  ConfigModule,
  MinioModule.registerAsync({
    imports: [ConfigModule], 
    useFactory: async (configService: ConfigService) => ({
    endPoint: configService.get<string>('MINIO_URL'),
    port:80,
    region: 'us-east-1', 
    useSSL: false,
    accessKey: configService.get<string>('MINIO_ACCESS_KEY'),
    secretKey: configService.get<string>('MINIO_SECRET_KEY')
    }),
    inject: [ConfigService],
  }),

  OrdersModule,
  PaymentsModule,
  StripeModule,
  CartModule,

  TypeOrmModule.forFeature([Payment]),TypeOrmModule.forFeature([OrderItem]),TypeOrmModule.forFeature([User]),TypeOrmModule.forFeature([Product]),TypeOrmModule.forFeature([CartItem]),TypeOrmModule.forFeature([ProductImage]),TypeOrmModule.forFeature([Attribute]),TypeOrmModule.forFeature([ProductAttributeValue]),TypeOrmModule.forFeature([Category]),TypeOrmModule.forFeature([CategoryAttribute]),TypeOrmModule.forFeature([CategoryImage]),TypeOrmModule.forFeature([EmailVerification]),TypeOrmModule.forFeature([Comment]),TypeOrmModule.forFeature([Order]),
  UsersModule, JwtModule, AuthModule, ProductsModule, CartModule, PaymentsModule,  AttributeModule, CategoryModule, ProductAttributeValueModule, CategoryImageModule, CommentModule, StripeModule, OrdersModule],
  controllers: [AppController,UsersController, ProductAttributeValueController,CategoryImageController, ProductImageController, OrdersController,PaymentsController],
  providers: [AppService,UsersService,JwtService,BcryptService,CartService,ProductImageService, ContentService, ProductAttributeValueService, CategoryImageService, MailerService, VerificationService, CommentService, OrdersService, StripeService,PaymentsService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  
})
export class AppModule {}
