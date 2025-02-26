import { Controller, Get, Post, Body, Param, Query, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async getFilteredProducts(
      @Query('search') search?: string,
      @Query('minPrice') minPrice?: number,
      @Query('maxPrice') maxPrice?: number,
      @Query('category') category?: string,
    ) {
      return this.productsService.getFilteredProducts(search, minPrice, maxPrice, category);
    }

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
      return this.productsService.create(createProductDto);
    }
  
    @Get()
    findAll() {
      return this.productsService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: number) {
      return this.productsService.findOne(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
      return this.productsService.update(id, updateProductDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: number) {
      return this.productsService.remove(id);
    }
}
