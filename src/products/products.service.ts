import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductImage } from './entities/product-images.entity';
import { AddProductImagesDto } from './dto/add-product-images.dto';
import { warn } from 'console';
import { ProductImageService } from '../product-image/product-image.service';
@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        @InjectRepository(ProductImage) private imageRepository: Repository<ProductImage>,
        
    ) {}
    

    async filterProducts(
      categoryName: string,
      attributes: Record<string, string[]>,
      page: number = 1,
      limit: number = 10
    ) {
      const countQuery = this.productRepository.createQueryBuilder('product')
        .leftJoin('product.category', 'category')
        .where('category.category_name = :categoryName', { categoryName });
    
      const dataQuery = this.productRepository.createQueryBuilder('product')
        .leftJoinAndSelect('product.category', 'category')
        .leftJoinAndSelect('product.attributeValue', 'pav')
        .leftJoinAndSelect('pav.attribute', 'attribute')
        .leftJoinAndSelect('product.images', 'images')
        .where('category.category_name = :categoryName', { categoryName });
    
      Object.entries(attributes).forEach(([name, values]) => {
        const valuesArray = Array.isArray(values) ? values : [values];
        const paramName = `${name}_values`;
    
        const attributeCondition = `EXISTS (
          SELECT 1 FROM product_attribute_value pav
          JOIN attribute a ON pav.attributeId = a.id
          WHERE pav.productId = product.id
          AND a.attribute_name = :${name}_name
          AND pav.value IN (:...${paramName})
        )`;
    
        countQuery.andWhere(attributeCondition, {
          [`${name}_name`]: name,
          [paramName]: valuesArray
        });
    
        dataQuery.andWhere(attributeCondition, {
          [`${name}_name`]: name,
          [paramName]: valuesArray
        });
      });
    
      const total = await countQuery.getCount();
    
      const products = await dataQuery
        .orderBy('product.id', 'ASC')
        .skip((page - 1) * limit)
        .take(limit)
        .getMany();
    
      const formattedProducts = products.map(product => {
        const uniqueAttributes = [];
        const seenAttributes = new Set();
        
        product.attributeValue.forEach(pav => {
          const attrKey = `${pav.attribute.attribute_name}_${pav.value}`;
          if (!seenAttributes.has(attrKey)) {
            seenAttributes.add(attrKey);
            uniqueAttributes.push({
              attribute_name: pav.attribute.attribute_name,
              value: pav.value
            });
          }
        });
    
        return {
          product_id: product.id,
          product_name: product.name,
          product_price: product.price,
          category_id: product.category.id,
          category_name: product.category.category_name,
          attributes: uniqueAttributes,
          images: product.images.map(image => ({
            id: image.id,
            imageUrl: image.imageUrl,
            numer: image.numer
          }))
        };
      });
    
      return {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        data: formattedProducts,
      };
    }
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
    
  }
