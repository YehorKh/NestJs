import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {BcryptService} from '../bcrypt/bcrypt.service'
import { EmailVerification } from 'src/verification/entities/verification.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(EmailVerification)
    private verificationRepo: Repository<EmailVerification>,
    private readonly bcryptService: BcryptService
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
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return await this.userRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.verificationRepo.delete({email:(await this.userRepository.findOne({ where: { id } })).email})
    await this.userRepository.delete(id)
  }
}