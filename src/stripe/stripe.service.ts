import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { OrdersService } from 'src/order/order.service'; 
import { PaymentsService } from 'src/payments/payments.service';
import { Order } from 'src/order/entities/order.entity';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    private ordersService: OrdersService,
    private paymentsService: PaymentsService,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-02-24.acacia',
    });
  }
  async createPaymentIntent(order: Order) {
   const paymentIntent = await this.stripe.paymentIntents.create({
     amount: Math.round(order.total* 100 ),
     currency: 'usd',
     metadata: { orderId: order.id.toString() },
     payment_method_types: ['card'],
   });
 
   await this.ordersService.updateOrder(order.id, {
     paymentIntentId: paymentIntent.id
   });
 
   return {
     clientSecret: paymentIntent.client_secret,
     orderId: order.id
   };
 }

  async handleWebhook(signature: string, payload: Buffer) {
    const event = this.stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const orderId = parseInt(paymentIntent.metadata.orderId);
      
      await this.ordersService.updateOrderStatus(orderId, 'paid');
      await this.paymentsService.createPaymentRecord(
        await this.ordersService.getOrderById(orderId),
        {
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency,
          status: 'succeeded',
          paymentIntentId: paymentIntent.id,
        },
      );
    }

    return { received: true };
  }

  async cancelPaymentIntent(paymentIntentId: string) {
   return this.stripe.paymentIntents.cancel(paymentIntentId);
 }
}