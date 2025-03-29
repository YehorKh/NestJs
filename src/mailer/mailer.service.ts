import { Injectable } from '@nestjs/common';
import { CourierClient } from '@trycourier/courier';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class MailerService {
  private courier;

  constructor() {
    this.courier = new CourierClient({ authorizationToken: process.env.COURIER_API_KEY });
  }

  async sendVerificationEmail(to: string, code: string) {
    const { requestId } = await this.courier.send({
      message: {
        to: {
          email: to,
        },
        content: {
          title: 'Account Verification',
          body: `Your verification code is: **${code}**`,
        },
        routing: {
          method: 'single',
          channels: ['email'],
        },
      },
    });

    console.log(`Email sent to ${to} with request ID: ${requestId}`)
  }
}
