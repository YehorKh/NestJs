import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { CategoryAttribute } from '../../category-attribute/entities/category-attribute.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category_name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @OneToMany(() => CategoryAttribute, (ca) => ca.category)
  categoryAttributes: CategoryAttribute[];
}