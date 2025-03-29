import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailVerification } from './entities/verification.entity';
import { User } from 'src/users/entities/user.entity';
import { warn } from 'console';

@Injectable()
export class VerificationService {
  constructor(
    @InjectRepository(EmailVerification)
    private verificationRepo: Repository<EmailVerification>,
    @InjectRepository(User)
        private readonly userRepository: Repository<User>,
  ) {}

  async generateCode(email: string): Promise<string> {
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await this.verificationRepo.save({ email, code });

    return code;
  }

  async verifyCode(email: string, code: string): Promise<boolean> {
   const record = await this.verificationRepo.findOne({ where: { email, code } });
   if (!record) return false;
 
   const now = new Date();
   const createdAt = new Date(record.createdAt);
   const minutesPassed = (now.getTime() - createdAt.getTime()) / (1000 * 60);
 
   if (minutesPassed > 10) {
     await this.verificationRepo.delete({ email });
     return false; 
   }
 
   await this.userRepository.update({ email }, { emailVerified: true });
   await this.verificationRepo.delete({ email });
 
   return true;
 }
 
}
