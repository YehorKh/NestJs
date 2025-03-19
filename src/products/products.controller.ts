import { Controller, Get, Post, Body, Param, Query, Patch, Delete, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductsDto } from './dto/filter-product.dto';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { AddProductImagesDto } from './dto/add-product-images.dto';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post(':id/images')
    async addImages(@Param('id') id: number, @Body() dto: AddProductImagesDto) {
      return this.productsService.addProductImages(id, dto);
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
