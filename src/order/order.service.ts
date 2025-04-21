import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/orderitem.entity';
import { User } from '../users/entities/user.entity';
import { CartItem } from '../cart/entities/cart.entity';
import { CreateOrderDto } from './dto/create-order.dto'; 
import { UpdateOrderDto } from './dto/update-order.dto';
import { StripeService } from 'src/stripe/stripe.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    //private readonly stripeService: StripeService,

  ) {}
  async updateOrder(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
   await this.orderRepository.update(id, updateOrderDto);
   return this.orderRepository.findOne({ 
     where: { id },
     relations: ['items', 'items.product'] 
   });
 }
  async createOrder(userId:number, createOrderDto: CreateOrderDto): Promise<Order> {
    const { shippingAddress, contactPhone } = createOrderDto;
    
    const cartItems = await this.cartItemRepository.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });

    if (cartItems.length === 0) {
      throw new NotFoundException('Cart is empty');
    }

    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );

    const order = await this.orderRepository.save({
      user: { id: userId },
      total,
      shippingAddress: createOrderDto.shippingAddress,
      contactPhone: createOrderDto.contactPhone,
      status: 'created',
      paymentIntentId: null 
    });

    const savedOrder = await this.orderRepository.save(order);

    const orderItems = cartItems.map(cartItem =>
      this.orderItemRepository.create({
        order: savedOrder,
        product: cartItem.product,
        quantity: cartItem.quantity,
        priceAtPurchase: cartItem.product.price,
      }),
    );

    await this.orderItemRepository.save(orderItems);

    return savedOrder;
  }

  async getUserOrders(userId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { user: { id: userId } },
      relations: ['items', 'items.product'],
    });
  }

  async getOrderById(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'items', 'items.product'],
    });
    
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    
    return order;
  }

  async updateOrderStatus(id: number, status: string): Promise<Order> {
    const order = await this.getOrderById(id);
    order.status = status;
    return this.orderRepository.save(order);
  }

  async cancelOrder(orderId: number, userId: number): Promise<Order> {
   const order = await this.orderRepository.findOne({
     where: { id: orderId, user: { id: userId } },
     relations: ['items']
   });
 
   if (!order) {
     throw new NotFoundException('Order not found');
   }
 
   if (order.status !== 'created') {
     throw new BadRequestException(
       `Cannot cancel order with status "${order.status}"`
     );
   }
 
   if (order.paymentIntentId) {
     //await this.stripeService.cancelPaymentIntent(order.paymentIntentId);
   }
 
   order.status = 'canceled';
   return this.orderRepository.save(order);
 }
}