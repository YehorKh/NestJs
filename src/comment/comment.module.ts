import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Comment} from './entities/comment.entity'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
@Module({
  
   imports: [ConfigModule.forRoot({
    isGlobal: true, 
    envFilePath: '.env', 
  }),
  
    JwtModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], 
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'), 
        signOptions: { expiresIn: '3600s' },
      }),
      inject: [ConfigService], 
    }),TypeOrmModule.forFeature([Comment]),TypeOrmModule.forFeature([Product]),TypeOrmModule.forFeature([User])],
  providers: [CommentService],
  controllers: [CommentController]
})
export class CommentModule {}
