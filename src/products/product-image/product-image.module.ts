import { Module } from '@nestjs/common';
import { ProductImage } from '../entities/product-images.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImageService } from './product-image.service';
import { Product } from '../entities/product.entity';

@Module({
   imports:[TypeOrmModule.forFeature([ProductImage]),TypeOrmModule.forFeature([Product])],
   providers:[ProductImageService]
})
export class ProductImageModule {}
