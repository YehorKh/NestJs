import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Product } from './product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => Product, (product) => product.images, { onDelete: 'CASCADE' })
  @ApiProperty()
  product: Product;

  @Column()
  @ApiProperty()
  imageUrl: string;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;
}