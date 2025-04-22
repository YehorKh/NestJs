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
import { ProductAttributeValue } from 'src/product-attribute-value/entities/product-attribute-value.entity';
import { Category } from 'src/category/entities/category.entity';
import { Attribute } from 'src/attribute/entities/attribute.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { CategoryAttribute } from 'src/category-attribute/entities/category-attribute.entity';
@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        @InjectRepository(ProductImage) private imageRepository: Repository<ProductImage>,
        @InjectRepository(ProductAttributeValue) private productAttributeValueRepository: Repository<ProductAttributeValue>,
        @InjectRepository(Attribute) private attributeRepository: Repository<Attribute>,
        @InjectRepository(Category) private categoryRepository: Repository<Category>,
        @InjectRepository(CategoryAttribute) private categoryAttributeRepository: Repository<CategoryAttribute>,
    ) {}
    

    async filterProducts(
      categoryName: string,
      attributes: Record<string, string[]>,
      page: number = 1,
      limit: number = 10,
      searchQuery?: string,
      minPrice?: number,
      maxPrice?: number
    ) {
      // Проверка: использовать ли searchQuery как категорию
      if (!categoryName && searchQuery) {
        const categoryMatch = await this.categoryRepository.findOne({
          where: { category_name: searchQuery },
        });
        if (categoryMatch) {
          categoryName = categoryMatch.category_name;
          searchQuery = undefined;
        }
      }
    
      const dataQuery = this.productRepository.createQueryBuilder('product')
        .leftJoinAndSelect('product.category', 'category')
        .leftJoinAndSelect('product.attributeValue', 'pav')
        .leftJoinAndSelect('pav.attribute', 'attribute')
        .leftJoinAndSelect('product.images', 'images')
        .leftJoinAndSelect('product.comments', 'comments');
    
      if (categoryName) {
        dataQuery.where('category.category_name = :categoryName', { categoryName });
      }
    
      if (minPrice !== undefined) {
        dataQuery.andWhere('product.price >= :minPrice', { minPrice });
      }
    
      if (maxPrice !== undefined) {
        dataQuery.andWhere('product.price <= :maxPrice', { maxPrice });
      }
    
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
    
        dataQuery.andWhere(attributeCondition, {
          [`${name}_name`]: name,
          [paramName]: valuesArray,
        });
      });
    
      const allProducts = await dataQuery
        .orderBy('product.id', 'ASC')
        .getMany();
    
      const filteredProducts = searchQuery
        ? allProducts.filter((product) => {
            const query = searchQuery.toLowerCase();
            return (
              product.name.toLowerCase().includes(query) ||
              product.category.category_name.toLowerCase().includes(query) ||
              product.attributeValue.some(pav =>
                pav.value.toLowerCase().includes(query)
              )
            );
          })
        : allProducts;
    
      const total = filteredProducts.length;
      const paginated = filteredProducts.slice((page - 1) * limit, page * limit);
    
      const formattedProducts = paginated.map(product => {
        const uniqueAttributes = [];
        const seenAttributes = new Set();
    
        product.attributeValue.forEach(pav => {
          const attrKey = `${pav.attribute.attribute_name}_${pav.value}`;
          if (!seenAttributes.has(attrKey)) {
            seenAttributes.add(attrKey);
            uniqueAttributes.push({
              attribute_name: pav.attribute.attribute_name,
              value: pav.value,
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
            numer: image.numer,
          })),
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
    async getProductById(id: number) {
      const product = await this.productRepository.findOne({
        where: { id },
        relations: [
          'category',
          'attributeValue',
          'attributeValue.attribute',
          'images',
          'comments'
        ]
      });
    
      if (!product) {
        throw new Error('Product not found');
      }
    
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
        })),
        comments: product.comments.map(comment => ({
          id: comment.id,
          raiting: comment.rating,
          context: comment.content
        }))
      };
    }
    async getProductByName(name: string) {
      const product = await this.productRepository.findOne({
        where: { name },
        relations: [
          'category',
          'attributeValue',
          'attributeValue.attribute',
          'images'
        ]
      });
    
      if (!product) {
        throw new Error('Product not found');
      }
    
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
    }
    async updateProduct(
      id: number,
      updateData: {
        name?: string;
        price?: number;
        categoryId?: number;
        attributes?: Array<{ attribute_name: string; value: string }>;
        images?: Array<{ imageUrl: string; numer?: number }>;
      }
    ) {
      const product = await this.productRepository.findOne({
        where: { id },
        relations: [
          'category',
          'attributeValue',
          'attributeValue.attribute',
          'images'
        ]
      });
    
      if (!product) {
        throw new Error('Product not found');
      }
    
      if (updateData.name !== undefined) {
        product.name = updateData.name;
      }
      if (updateData.price !== undefined) {
        product.price = updateData.price;
      }
      if (updateData.categoryId !== undefined) {
        product.category = await this.categoryRepository.findOneBy({ id: updateData.categoryId });
        if (!product.category) {
          throw new Error('Category not found');
        }
      }
    
      if (updateData.attributes !== undefined) {
        await this.productAttributeValueRepository.delete({ product: { id } });
    
        for (const attr of updateData.attributes) {
          const attribute = await this.attributeRepository.findOneBy({ attribute_name: attr.attribute_name });
          if (!attribute) {
            throw new Error(`Attribute ${attr.attribute_name} not found`);
          }
    
          const newAttrValue = this.productAttributeValueRepository.create({
            product,
            attribute,
            value: attr.value
          });
          await this.productAttributeValueRepository.save(newAttrValue);
        }
      }
    
      if (updateData.images !== undefined) {
        await this.imageRepository.delete({ product: { id } });
    
        for (const [index, img] of updateData.images.entries()) {
          const newImage = this.imageRepository.create({
            product,
            imageUrl: img.imageUrl,
            numer: img.numer !== undefined ? img.numer : index
          });
          await this.imageRepository.save(newImage);
        }
      }
    
      await this.productRepository.save(product);
    
      const updatedProduct = await this.productRepository.findOne({
        where: { id },
        relations: [
          'category',
          'attributeValue',
          'attributeValue.attribute',
          'images'
        ]
      });
    
      const uniqueAttributes = [];
      const seenAttributes = new Set();
      
      updatedProduct.attributeValue.forEach(pav => {
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
        product_id: updatedProduct.id,
        product_name: updatedProduct.name,
        product_price: updatedProduct.price,
        category_id: updatedProduct.category.id,
        category_name: updatedProduct.category.category_name,
        attributes: uniqueAttributes,
        images: updatedProduct.images.map(image => ({
          id: image.id,
          imageUrl: image.imageUrl,
          numer: image.numer
        }))
      };
    }
    create(product: Partial<Product>): Promise<Product> {
      return this.productRepository.save(product);
    }
    async createWithRelations(createProductDto: {
      name: string;
      price: number;
      categoryName: string;
      attributes: Record<string, string>;
    }): Promise<Product> {
      // 1. Находим или создаем категорию
      let category = await this.categoryRepository.findOne({
        where: { category_name: createProductDto.categoryName }
      });
    
      if (!category) {
        category = this.categoryRepository.create({
          category_name: createProductDto.categoryName
        });
        category = await this.categoryRepository.save(category);
      }
    
      // 2. Создаем и сохраняем продукт
      const product = this.productRepository.create({
        name: createProductDto.name,
        price: createProductDto.price,
        category
      });
      await this.productRepository.save(product);
    
      // 3. Обрабатываем атрибуты
      if (createProductDto.attributes && Object.keys(createProductDto.attributes).length > 0) {
        const productAttributeValues = await Promise.all(
          Object.entries(createProductDto.attributes).map(async ([attributeName, value]) => {
            // Находим или создаем атрибут
            let attribute = await this.attributeRepository.findOne({
              where: { attribute_name: attributeName }
            });
    
            if (!attribute) {
              attribute = this.attributeRepository.create({
                attribute_name: attributeName
              });
              attribute = await this.attributeRepository.save(attribute);
    
              // Создаем связь категории с атрибутом
              const categoryAttribute = this.categoryAttributeRepository.create({
                category,
                attribute
              });
              await this.categoryAttributeRepository.save(categoryAttribute);
            } else {
              // Проверяем связь атрибута с категорией
              const existingRelation = await this.categoryAttributeRepository.findOne({
                where: {
                  category: { id: category.id },
                  attribute: { id: attribute.id }
                }
              });
    
              if (!existingRelation) {
                const categoryAttribute = this.categoryAttributeRepository.create({
                  category,
                  attribute
                });
                await this.categoryAttributeRepository.save(categoryAttribute);
              }
            }
    
            // Создаем значение атрибута для продукта
            return this.productAttributeValueRepository.save(
              this.productAttributeValueRepository.create({
                product,
                attribute,
                value
              })
            );
          })
        );
    
        // Обновляем продукт с атрибутами
        product.attributeValue = productAttributeValues;
        return this.productRepository.save(product);
      }
    
      return product;
    }
    async getSearchSuggestions(query: string): Promise<string[]> {
      const rawResults = await this.productRepository
        .createQueryBuilder('product')
        .leftJoin('product.category', 'category')
        .leftJoin('product.attributeValue', 'pav')
        .leftJoin('pav.attribute', 'attribute')
        .select([
          'product.name AS productName',
          'pav.value AS attributeValue',
          'category.category_name AS categoryName',
        ])
        .where('LOWER(product.name) LIKE :query', { query: `%${query.toLowerCase()}%` })
        .orWhere('LOWER(pav.value) LIKE :query', { query: `%${query.toLowerCase()}%` })
        .orWhere('LOWER(category.category_name) LIKE :query', { query: `%${query.toLowerCase()}%` })
        .getRawMany();
    
      const suggestions = new Set<string>();
    
      rawResults.forEach((row) => {
        if (row.productName && row.productName.toLowerCase().includes(query.toLowerCase())) {
          suggestions.add(row.productName);
        }
        if (row.attributeValue && row.attributeValue.toLowerCase().includes(query.toLowerCase())) {
          suggestions.add(row.attributeValue);
        }
        if (row.categoryName && row.categoryName.toLowerCase().includes(query.toLowerCase())) {
          suggestions.add(row.categoryName);
        }
      });
    
      return Array.from(suggestions).slice(0, 10);
    }
    async update(id: number, product: Partial<Product>): Promise<Product> {
      await this.productRepository.update(id, product);
      return this.productRepository.findOne({ where: { id: id } });
    }
  
    async remove(id: number): Promise<void> {
      await this.productRepository.delete(id);
    }
    
  }
