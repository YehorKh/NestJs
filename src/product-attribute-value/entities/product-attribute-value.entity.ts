import { Entity, PrimaryColumn, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from 'src/products/entities/product.entity'; 
import { Attribute } from 'src/attribute/entities/attribute.entity';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class ProductAttributeValue {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => Product, (product) => product.attributeValue, { onDelete: 'CASCADE' })
  product: Product;

  @ApiProperty()
  @ManyToOne(() => Attribute, (attribute) => attribute.productAttributeValue, { onDelete: 'CASCADE' })
  attribute: Attribute;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255 })
  value: string;
}