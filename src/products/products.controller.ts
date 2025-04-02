import { Controller, Get, Post, Body, Param, Query, Patch, Delete, Put, UseInterceptors, UploadedFile, BadRequestException, DefaultValuePipe, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductResponseDto, UpdateProductDto } from './dto/update-product.dto';
import { FilterProductsDto } from './dto/filter-product.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { AddProductImagesDto } from './dto/add-product-images.dto';
import { Product } from './entities/product.entity';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService,
    ) {} 
    @Get()
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
  description: 'JSON-строка с атрибутами' 
})
@ApiQuery({
  name: 'page',
  required: false,
  type: Number,
  example: 1,
})
@ApiQuery({
  name: 'limit',
  required: false,
  type: Number,
  example: 10,
  description: 'Количество элементов на странице'
})
async filterProducts(
  @Query('category') category: string,
  @Query('attributes') attributes?: string ,
  @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
  @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 1
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

    return this.productsService.filterProducts(category, normalizedAttributes,page,limit);
  } catch (error) {
    throw new BadRequestException('Неверный формат attributes JSON-строка.');
  }
}
    // @Get()
    // findAll(): Promise<Product[]> {
    //   return this.productsService.findAll();
    // }
  
    @Get(':id')
    findOne(@Param('id') id: number) {
      return this.productsService.getProductById(id);
    }
  
    @Post()
    create(@Body() product: Product): Promise<Product> {
      return this.productsService.create(product);
    }
    @Put(':id')
    @ApiOperation({ 
      description: 'Update partially or fully' 
    })
    @ApiParam({ 
      name: 'id', 
      type: Number 
    })
    @ApiBody({ 
      type: UpdateProductDto,
      examples: {
        basic: {
          summary: 'Example 1',
          value: {
            name: "Gaming PC",
            price: 999.99,
            categoryId: 2,
            attributes: [
              { attribute_name: "Color", value: "red" }
                        ],
            images: [
              { imageUrl: "https://minio/113/new.png", numer: 0 },
            ]
          }
        },
        partial: {
          summary: 'Example 2',
          value: {
            price: 17799.99
          }
        }
      }
    })
    @ApiResponse({ 
      status: 200, 
      description: 'Success', 
      type: ProductResponseDto 
    })
    @ApiResponse({ 
      status: 404, 
      description: 'Product not found' 
    })
    @ApiResponse({ 
      status: 400, 
      description: 'Wrong data' 
    })
    async updateProduct(
      @Param('id') id: number,
      @Body() updateData: UpdateProductDto
    ): Promise<ProductResponseDto> {
      try {
        return await this.productsService.updateProduct(id, updateData);
      } catch (error) {
        if (error.message.includes('not found')) {
          throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
    
  
    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
      return this.productsService.remove(id);
    }

}
