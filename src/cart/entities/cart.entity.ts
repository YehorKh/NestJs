import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CartItem {
   @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @ManyToOne(() => User, (user) => user.id)
  user: User;
  @ApiProperty()
  @ManyToOne(() => Product)
  product: Product;
  
  @ApiProperty()
  @Column()
  quantity: number;
}