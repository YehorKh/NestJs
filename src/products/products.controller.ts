import { Controller, Get, Post, Body, Param, Query, Patch, Delete, Put, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductsDto } from './dto/filter-product.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { AddProductImagesDto } from './dto/add-product-images.dto';
import { Product } from './entities/product.entity';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService,
    ) {}


    
    

    
    @Get('filter')
@ApiOperation({ summary: 'Filter by category and attributes' })
@ApiQuery({ 
  name: 'category', 
  type: String, 
  required: true, 
  example: 'PC',
})
@ApiQuery({ 
  name: 'attributes', 
  type: String, 
  required: false, 
  example: '{"ram":["16 Gb","32 Gb"],"color":["Black","White"],"gpu":["GeForce RTX 3080","GeForce RTX 4060"]}',
  description: 'JSON-строка с атрибутами фильтрации массивы значений для каждого атрибута.' 
})
async filterProducts(
  @Query('category') category: string,
  @Query('attributes') attributes?: string 
) {
  try {
    const parsedAttributes = attributes ? JSON.parse(attributes) : {};
    
    const normalizedAttributes: Record<string, string[]> = {};
    
    for (const [key, value] of Object.entries(parsedAttributes)) {
      if (Array.isArray(value)) {
        normalizedAttributes[key] = value.map(v => String(v));
      } else if (value !== undefined && value !== null) {
        normalizedAttributes[key] = [String(value)];
      }
    }

    return this.productsService.filterProducts(category, normalizedAttributes);
  } catch (error) {
    throw new BadRequestException('Неверный формат параметра attributes. Ожидается JSON-строка.');
  }
}
    @Get()
    findAll(): Promise<Product[]> {
      return this.productsService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Product> {
      return this.productsService.findOne(id);
    }
  
    @Post()
    create(@Body() product: Product): Promise<Product> {
      return this.productsService.create(product);
    }
  
    @Put(':id')
    update(@Param('id') id: number, @Body() product: Partial<Product>): Promise<Product> {
      return this.productsService.update(id, product);
    }
  
    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
      return this.productsService.remove(id);
    }

}
