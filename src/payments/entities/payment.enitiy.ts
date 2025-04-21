import { ApiParam, ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Order)
  order: Order;

  @Column()
  amount: number;

  @Column()
  currency: string;

  @Column()
  status: string; 

  @Column()
  paymentIntentId: string;

  @CreateDateColumn()
  createdAt: Date;
}