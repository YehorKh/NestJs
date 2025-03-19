import { Entity, PrimaryColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Attribute } from 'src/attribute/entities/attribute.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CategoryAttribute {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Category, (category) => category.categoryAttributes, { onDelete: 'CASCADE' })
  category: Category;

  @ManyToOne(() => Attribute, (attribute) => attribute.categoryAttribute, { onDelete: 'CASCADE' })
  attribute: Attribute;
}
