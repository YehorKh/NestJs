import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from 'src/products/entities/product-images.entity';
import { Product } from 'src/products/entities/product.entity';


@Module({
   imports: [TypeOrmModule.forFeature([ProductImage]),TypeOrmModule.forFeature([Product])]
})
export class UploadModule {
}

