import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {BcryptService} from '../bcrypt/bcrypt.service'
import { EmailVerification } from 'src/verification/entities/verification.entity';
import { SafeUserDto } from './dto/safe-user.dto';
import { CartItem } from 'src/cart/entities/cart.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(EmailVerification)
    private verificationRepo: Repository<EmailVerification>,
    private readonly bcryptService: BcryptService,
    @InjectRepository(CartItem)
    private cartRepository: Repository<CartItem>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await this.bcryptService.hashPassword(createUserDto.password);
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }
  async findOneByName(name: string) : Promise<User> {
    return await this.userRepository.findOne({ where: { name } });
  }
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({ 
      where: { id },
      relations: ['cart', 'orders'] 
    });
  }
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return await this.userRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ 
      where: { id },
      relations: ['cart'] 
    });
  
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  
    await this.cartRepository.delete({ user: { id } });
  
    await this.verificationRepo.delete({ email: user.email });
  
    await this.userRepository.delete(id);
  }
  async updateShippingAddress(userId: number, address: string): Promise<User> {
    await this.userRepository.update(userId, { defaultShippingAddress: address });
    return await this.userRepository.findOne({ where: { id: userId } });
  }

  async updatePhoneNumber(userId: number, phoneNumber: string): Promise<User> {
    await this.userRepository.update(userId, { phoneNumber });
    return await this.userRepository.findOne({ where: { id: userId } });
  }
  async updateName(userId: number, name: string): Promise<User> {
    await this.userRepository.update(userId, { name });
    return this.userRepository.findOne({ where: { id: userId } });
  }

  async updateEmail(userId: number, email: string): Promise<User> {
    await this.userRepository.update(userId, { email, emailVerified: false });
    return this.userRepository.findOne({ where: { id: userId } });
  }

  async updatePassword(userId: number, password: string): Promise<User> {
    const hashedPassword = await this.bcryptService.hashPassword(password);
    await this.userRepository.update(userId, { password: hashedPassword });
    return this.userRepository.findOne({ where: { id: userId } });
  }
}