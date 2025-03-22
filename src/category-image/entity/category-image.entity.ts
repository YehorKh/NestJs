import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('category_image')
export class CategoryImage {
   @ApiProperty()
   @PrimaryGeneratedColumn()
   id: number;

   @ApiProperty()
   @Column()
   name: string;

   @ApiProperty()
   @Column()
   imageSrc: string;
}
