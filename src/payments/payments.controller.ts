import {
  Controller,
  Post,
  Body,
  Headers,
  UseGuards,
  HttpCode,
  Param,
  Req,
  ParseIntPipe,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { OrdersService } from 'src/order/order.service';
import { PaymentsService } from './payments.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from '../users/entities/user.entity';
import { StripeService } from 'src/stripe/stripe.service'; 
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Order } from 'src/order/entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly paymentsService: PaymentsService,
    private readonly ordersService: OrdersService,
    @InjectRepository(Order)
        private orderRepository: Repository<Order>,
  ) {}
  @Post(':id/create-payment')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async createPayment(
    @Param('id', ParseIntPipe) orderId: number,
    @Req() req
  ) {
    const order = await this.ordersService.getOrderById(orderId);
    
    if (order.user.id !== req.user.id) {
      throw new ForbiddenException();
    }
  
    return this.stripeService.createPaymentIntent(order);
  }
  
  @Post('webhook')
  @HttpCode(200)
  async handleWebhook(@Headers('stripe-signature') signature: string, @Body() rawBody: Buffer) {
    return this.stripeService.handleWebhook(signature, rawBody);
  }
  @Post(':id/cancel-order')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async cancelOrder(@Param('id', ParseIntPipe) orderId: number,@Req() req): Promise<Order> {

    const order = await this.orderRepository.findOne({
      where: { id: orderId, user: { id: req.user.id } },
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
      await this.stripeService.cancelPaymentIntent(order.paymentIntentId);
    }
  
    order.status = 'canceled';
    return this.orderRepository.save(order);
  }
}