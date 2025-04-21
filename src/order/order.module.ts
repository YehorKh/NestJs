// orders/orders.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/orderitem.entity';
import { OrdersService } from './order.service';
import { OrdersController } from './order.controller';
import { PaymentsModule } from '../payments/payments.module';
import { CartItem } from 'src/cart/entities/cart.entity';
import { JwtService } from '@nestjs/jwt';
import { StripeService } from 'src/stripe/stripe.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem,CartItem]),
    forwardRef(() => PaymentsModule),
  ],
  providers: [OrdersService,JwtService],
  controllers: [OrdersController],
  exports: [OrdersService, TypeOrmModule], 
})
export class OrdersModule {}