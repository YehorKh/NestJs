import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { ProductImage } from './product-images.entity';
import { Category } from 'src/category/entities/category.entity';
import { ProductAttributeValue } from 'src/product-attribute-value/entities/product-attribute-value.entity';
import { Comment } from 'src/comment/entities/comment.entity';
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @Column()
  name: string;
  
  @ApiProperty()
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ApiProperty()
  @ManyToOne(() => Category, (category) => category.id)
  category: Category;

  @ApiProperty()
  @OneToMany(() => ProductAttributeValue, (pav) => pav.product)
  attributeValue: ProductAttributeValue[];

  @ApiProperty()
  @OneToMany(() => ProductImage, (image) => image.product, { cascade: true })
  images: ProductImage[];

  @ApiProperty()
  @OneToMany(() => Comment, (comment) => comment.product, { cascade: true })
  comments: Comment[]
}