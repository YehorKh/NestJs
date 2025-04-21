import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';
import { OrderItem } from './orderitem.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];

  @Column({ default: 'pending' })
  status: string; 

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column({ nullable: true }) 
  paymentIntentId?: string;

  @Column({ nullable: true })
  trackingNumber: string; 

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  shippingAddress: string;

  @Column()
  contactPhone: string; 
}