import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductAttributeValue } from './entities/product-attribute-value.entity';
import { CreateProductAttributeValuesDto } from './dto/create-product-attribute-values.dto';
import { UpdateProductAttributeValuesDto } from './dto/update-product-attribute-values.dto';

@Injectable()
export class ProductAttributeValueService {
  constructor(
    @InjectRepository(ProductAttributeValue)
    private readonly productAttributeValueRepository: Repository<ProductAttributeValue>,
  ) {}

  async create(dto: CreateProductAttributeValuesDto): Promise<ProductAttributeValue> {
    const productAttributeValue = this.productAttributeValueRepository.create(dto);
    return this.productAttributeValueRepository.save(productAttributeValue);
  }

  async findAll(): Promise<ProductAttributeValue[]> {
    return this.productAttributeValueRepository.find({ relations: ['product', 'attribute'] });
  }

  async findOne(id: number): Promise<ProductAttributeValue> {
    return this.productAttributeValueRepository.findOne({ where: { id }, relations: ['product', 'attribute'] });
  }

  async update(id: number, dto: UpdateProductAttributeValuesDto): Promise<ProductAttributeValue> {
    await this.productAttributeValueRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.productAttributeValueRepository.delete(id);
  }

  async findUniqueValuesByAttribute(attributeId: number): Promise<string[]> {
    const values = await this.productAttributeValueRepository
      .createQueryBuilder('pav')
      .select('DISTINCT pav.value', 'value')
      .where('pav.attributeId = :attributeId', { attributeId })
      .getRawMany();
    return values.map(v => v.value);
  }
}
