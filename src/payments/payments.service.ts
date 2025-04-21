import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.enitiy';
import { Order } from 'src/order/entities/order.entity'; 

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async createPaymentRecord(order: Order, paymentData: any): Promise<Payment> {
    const payment = this.paymentRepository.create({
      order,
      amount: paymentData.amount,
      currency: paymentData.currency,
      status: paymentData.status,
      paymentIntentId: paymentData.paymentIntentId,
    });
    
    return this.paymentRepository.save(payment);
  }

  async updatePaymentStatus(paymentIntentId: string, status: string): Promise<void> {
    await this.paymentRepository.update(
      { paymentIntentId },
      { status },
    );
  }
  
}