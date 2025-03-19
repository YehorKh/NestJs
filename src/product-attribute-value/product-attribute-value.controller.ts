import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ProductAttributeValueService } from './product-attribute-value.service';
import { CreateProductAttributeValuesDto } from './dto/create-product-attribute-values.dto';
import { UpdateProductAttributeValuesDto } from './dto/update-product-attribute-values.dto';

@Controller('product-attribute-values')
export class ProductAttributeValueController {
  constructor(private readonly service: ProductAttributeValueService) {}

  @Post()
  create(@Body() dto: CreateProductAttributeValuesDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateProductAttributeValuesDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }

  @Get('unique-values/:attributeId')
  findUniqueValuesByAttribute(@Param('attributeId') attributeId: number) {
    return this.service.findUniqueValuesByAttribute(attributeId);
  }
}