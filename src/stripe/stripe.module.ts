// payments/stripe.module.ts
import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { PaymentsModule } from 'src/payments/payments.module'; 
import { OrdersModule } from 'src/order/order.module'; 

@Module({
  imports: [PaymentsModule, OrdersModule],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}