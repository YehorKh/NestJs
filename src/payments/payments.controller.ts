import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ApiQuery } from '@nestjs/swagger';
import { PaymentDto } from './dto/payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-intent')
  
  async createPaymentIntent(@Body() paymentDto: PaymentDto ) {
    return this.paymentsService.createPaymentIntent(paymentDto.amount, paymentDto.currency);
  }
}
