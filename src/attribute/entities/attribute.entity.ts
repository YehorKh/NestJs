import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CategoryAttribute } from 'src/category-attribute/entities/category-attribute.entity';
import { ProductAttributeValue } from 'src/product-attribute-value/entities/product-attribute-value.entity';

@Entity()
export class Attribute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  attribute_name: string;

  @OneToMany(() => CategoryAttribute, (ca) => ca.attribute)
  categoryAttribute: CategoryAttribute[];

  @OneToMany(() => ProductAttributeValue, (pav) => pav.attribute)
  productAttributeValue: ProductAttributeValue[];
}