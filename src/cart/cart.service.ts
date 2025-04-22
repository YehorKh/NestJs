import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './entities/cart.entity';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { AddToCartDto } from './dto/cart.dto';
import { warn } from 'console';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private cartRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async addToCart(userId: number, dto: AddToCartDto): Promise<CartItem> {
   let cartItem = await this.cartRepository.findOne({ where: { user: { id: userId }, product: { id: dto.productId } } });

   if (cartItem) {
     cartItem.quantity += dto.quantity;
   } else {
     cartItem = this.cartRepository.create({
       user: { id: userId },
       product: { id: dto.productId },
       quantity: dto.quantity,
     });
   }

   return this.cartRepository.save(cartItem);
 }

  async getCart(user: number) {
    return this.cartRepository.find({
      where: { user: { id: user } },
      relations: ['product'],
    });
  }

  async removeFromCart(userId: number, productId: number) {
    await this.cartRepository.delete({ 
      user: { id: userId }, 
      product: { id: productId } 
    });
  }

  async clearCart(user: User) {
    return this.cartRepository.delete({ user: { id: user.id } });
  }
}