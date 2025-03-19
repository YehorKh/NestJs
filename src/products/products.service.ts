import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductImage } from './entities/product-images.entity';
import { AddProductImagesDto } from './dto/add-product-images.dto';
import { warn } from 'console';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        @InjectRepository(ProductImage) private imageRepository: Repository<ProductImage>,
        
    ) {}
    
    findAll(): Promise<Product[]> {
      return this.productRepository.find({ relations: ['attributeValue','category','images' ] });
    }
  
    findOne(id: number): Promise<Product> {
      return this.productRepository.findOne({ where: { id: id }, relations: ['category', 'attributeValue'] });
    }
  
    create(product: Partial<Product>): Promise<Product> {
      return this.productRepository.save(product);
    }
  
    async update(id: number, product: Partial<Product>): Promise<Product> {
      await this.productRepository.update(id, product);
      return this.productRepository.findOne({ where: { id: id } });
    }
  
    async remove(id: number): Promise<void> {
      await this.productRepository.delete(id);
    }
    async addProductImages(productId: number, dto: AddProductImagesDto): Promise<Product> {
      const product = await this.productRepository.findOne({ where: { id: productId }, relations: ['images'] });
    
      if (!product) {
        throw new NotFoundException('Product not found');
      }
    
      const images = dto.images.map((url) => this.imageRepository.create({ product, imageUrl: url }));
      await this.imageRepository.save(images);
    
      product.images.push(...images);
      return product;
    }
  }
