import { Injectable, Logger } from '@nestjs/common';
import Mailjet from 'node-mailjet';
import { ConfigService } from '@nestjs/config';
import { warn } from 'console';

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name);
  private readonly mailjet;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('MAILJET_API_KEY');
    const secretKey = this.configService.get<string>('MAILJET_SECRET_KEY');
    const Mailjet = require('node-mailjet');
    this.mailjet = Mailjet.apiConnect(apiKey, secretKey);
  }
  
  async sendVerificationEmail(toEmail: string, htmlContent: string) {
    const fromEmail = this.configService.get<string>('MAILJET_FROM_EMAIL');
    const fromName = this.configService.get<string>('MAILJET_FROM_NAME');
    try {
      const result = await this.mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
          {
            From: {
              Email: fromEmail,
              Name: fromName,
            },
            To: [
              {
                Email: toEmail,
              },
            ],
            Subject: 'Account Verification',
            TextPart: `Thanks for signing up!`,
              HTMLPart: `<h3>Your verification code is: <h2>${htmlContent}</h2></h3>`,
          },
        ],
      });
      this.logger.log('Mailjet response:', JSON.stringify(result.body, null, 2));

      return result.body;
    } catch (error) {
      this.logger.error(`Failed to send email to ${toEmail}`, error);
      throw error;
    }
  }
}
