import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
