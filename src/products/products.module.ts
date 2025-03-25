import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { ProductImage } from './entities/product-images.entity';
import { ProductImageService } from '../product-image/product-image.service';
import { ProductImageModule } from '../product-image/product-image.module';
import { ContentService } from 'src/content/content.service';

@Module({
    imports: [TypeOrmModule.forFeature([Product]),TypeOrmModule.forFeature([ProductImage])],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule {}