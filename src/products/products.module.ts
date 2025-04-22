import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { ProductImage } from './entities/product-images.entity';
import { ProductImageService } from '../product-image/product-image.service';
import { ProductImageModule } from '../product-image/product-image.module';
import { ContentService } from 'src/content/content.service';
import { Category } from 'src/category/entities/category.entity';
import { Attribute } from 'src/attribute/entities/attribute.entity';
import { ProductAttributeValue } from 'src/product-attribute-value/entities/product-attribute-value.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { CategoryAttribute } from 'src/category-attribute/entities/category-attribute.entity';
@Module({
    imports: [TypeOrmModule.forFeature([Product]),TypeOrmModule.forFeature([CategoryAttribute]),TypeOrmModule.forFeature([ProductImage]),TypeOrmModule.forFeature([Category]),TypeOrmModule.forFeature([Attribute]),TypeOrmModule.forFeature([ProductAttributeValue]),TypeOrmModule.forFeature([Comment])],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule {}