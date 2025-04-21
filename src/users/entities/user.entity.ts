import { ApiProperty } from '@nestjs/swagger';
import { CartItem } from 'src/cart/entities/cart.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Comment } from 'src/comment/entities/comment.entity';
import { Order } from 'src/order/entities/order.entity';
@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ unique: true })  
  name: string;

  @ApiProperty()
  @Column('json', { nullable: true })
  roles: string[];
  
  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @Column({ default: false })  
  emailVerified: boolean;

  @OneToMany(() => CartItem, (cartItem) => cartItem.user)
  cart: CartItem[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[]

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @Column({ nullable: true })
  defaultShippingAddress: string;

  @Column({ nullable: true })
  phoneNumber: string;
}