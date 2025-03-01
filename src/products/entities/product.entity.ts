import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductImage } from './product-images.entity';

@Entity()
export class Product {
   @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    price: number;

    @ApiProperty()
    @Column()
    description: string;

    @ApiProperty()
    @Column()
    category: string;

    @ApiProperty()
    @Column()
    stock:number

    @OneToMany(() => ProductImage, (image) => image.product, { cascade: true })
    images: ProductImage[];
}
