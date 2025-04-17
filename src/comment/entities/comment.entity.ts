import { ApiParam, ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('comments')
export class Comment {
   @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @Column()
  
  content: string;
  @ApiProperty()
  @Column({ type: 'int' })
  rating: number;
  @ApiProperty()
  @CreateDateColumn()
  date: Date;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user)
  user: User;
  
  @ApiProperty()
  @ManyToOne(() => Product)
  product: Product;
}
