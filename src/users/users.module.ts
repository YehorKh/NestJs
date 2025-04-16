import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { EmailVerification } from 'src/verification/entities/verification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]),TypeOrmModule.forFeature([EmailVerification])], 
  controllers: [UsersController],
  providers: [UsersService,BcryptService],
})
export class UsersModule {}
