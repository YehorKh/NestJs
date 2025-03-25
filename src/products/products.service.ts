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
      offset?: number,
      limit?: number
    ) {
      const query = this.productRepository.createQueryBuilder('product')
          .leftJoin('product.category', 'category')
          .leftJoin('product.attributeValue', 'pav')
          .leftJoin('pav.attribute', 'attribute')
          .leftJoin('product.images', 'pi')
          .select([
              'product.id AS product_id',
              'product.name AS product_name',
              'product.price AS product_price',
              'category.id AS category_id',
              'category.category_name AS category_name',
              "JSON_ARRAYAGG(JSON_OBJECT('attribute_name', attribute.attribute_name, 'value', pav.value)) AS attributes",
              `COALESCE(
                  (
                      SELECT JSON_ARRAYAGG(
                          JSON_OBJECT('id', pi.id, 'imageUrl', pi.imageUrl, 'numer', pi.numer)
                      )
                      FROM product_image pi
                      WHERE pi.productId = product.id
                      GROUP BY pi.productId
                  ), JSON_ARRAY()
              ) AS images`
          ])
          .where('category.category_name = :categoryName', { categoryName });
  
      const attributeConditions = [];
      const parameters = {};
      
      Object.entries(attributes).forEach(([name, values], attrIndex) => {
          const valuesArray = Array.isArray(values) ? values : [values];
          
          valuesArray.forEach((value, valIndex) => {
              const paramName = `attr_${attrIndex}_${valIndex}`;
              attributeConditions.push(`(attribute.attribute_name = :name_${paramName} AND pav.value = :value_${paramName})`);
              parameters[`name_${paramName}`] = name;
              parameters[`value_${paramName}`] = value;
          });
      });
  
      if (attributeConditions.length > 0) {
          const attributeNames = Object.keys(attributes);
          attributeNames.forEach((name, index) => {
              const attrValues = Array.isArray(attributes[name]) 
                  ? attributes[name] 
                  : [attributes[name]];
              
              const subQuery = this.productRepository.createQueryBuilder(`prod_${index}`)
                  .leftJoin(`prod_${index}.attributeValue`, `pav_${index}`)
                  .leftJoin(`pav_${index}.attribute`, `attr_${index}`)
                  .where(`prod_${index}.id = product.id`)
                  .andWhere(`attr_${index}.attribute_name = :attr_name_${index}`)
                  .andWhere(`pav_${index}.value IN (:...attr_values_${index})`)
                  .getQuery();
  
              query.andWhere(`EXISTS (${subQuery})`);
              parameters[`attr_name_${index}`] = name;
              parameters[`attr_values_${index}`] = attrValues;
          });
      }
  
      query.groupBy('product.id');
  
      const products = await query.setParameters(parameters).getRawMany();
      
      return products;
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
