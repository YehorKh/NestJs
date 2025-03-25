import { Module } from '@nestjs/common';
import { ProductImage } from '../products/entities/product-images.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImageService } from './product-image.service';
import { Product } from '../products/entities/product.entity';
import { ContentService } from 'src/content/content.service';
import { MinioModule, MinioService } from 'nestjs-minio-client';
import { ProductImageController } from './product-image.controller';

@Module({
   imports:[TypeOrmModule.forFeature([ProductImage]),TypeOrmModule.forFeature([Product])],
   controllers:[ProductImageController]
})
export class ProductImageModule {}
