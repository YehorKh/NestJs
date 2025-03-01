import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductImage } from './entities/product-images.entity';
import { AddProductImagesDto } from './dto/add-product-images.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        @InjectRepository(ProductImage) private imageRepository: Repository<ProductImage>,
        
    ) {}
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
    
    async getFilteredProducts(
        search?: string, 
        minPrice?: number, 
        maxPrice?: number, 
        category?: string
      ) {
        const query = this.productRepository.createQueryBuilder('product');
    
        if (search) {
          query.andWhere('LOWER(product.name) LIKE LOWER(:search)', { search: `%${search}%` });
        }
    
        if (minPrice) {
          query.andWhere('product.price >= :minPrice', { minPrice });
        }
    
        if (maxPrice) {
          query.andWhere('product.price <= :maxPrice', { maxPrice });
        }
    
        if (category) {
          query.andWhere('product.category = :category', { category });
        }
    
        return query.getMany();
      }
      async create(createProductDto: CreateProductDto): Promise<Product> {
        const product = this.productRepository.create(createProductDto);
        return this.productRepository.save(product);
      }
    
      async findAll(): Promise<Product[]> {
        return this.productRepository.find();
      }
      async findOne(id: number): Promise<Product> {
        const product =await this.productRepository.findOne({ where: { id }, relations: ['images'] });
        if (!product) {
          throw new NotFoundException(`Product with id ${id} not found`);
        }
        return product;
      }
    
      async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
        const product = await this.findOne(id);
        Object.assign(product, updateProductDto);
        return this.productRepository.save(product);
      }
    
      async remove(id: number): Promise<void> {
        const product = await this.findOne(id);
        await this.productRepository.remove(product);
      }
}