import { ApiProperty } from '@nestjs/swagger';
import { CartItem } from 'src/cart/entities/cart.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

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

  @OneToMany(() => CartItem, (cartItem) => cartItem.user)
  cart: CartItem[];
}