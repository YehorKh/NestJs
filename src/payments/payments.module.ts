// payments/payments.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.enitiy'; 
import { Order } from '../order/entities/order.entity'; 
import { PaymentsService } from './payments.service';
import { OrdersModule } from '../order/order.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, Order]), 
    forwardRef(() => OrdersModule), 
    
  ],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}