import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { EmailVerification } from 'src/verification/entities/verification.entity';
import { CartItem } from 'src/cart/entities/cart.entity';
export declare class UsersService {
    private readonly userRepository;
    private verificationRepo;
    private readonly bcryptService;
    private cartRepository;
    constructor(userRepository: Repository<User>, verificationRepo: Repository<EmailVerification>, bcryptService: BcryptService, cartRepository: Repository<CartItem>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findOneByName(name: string): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<void>;
    updateShippingAddress(userId: number, address: string): Promise<User>;
    updatePhoneNumber(userId: number, phoneNumber: string): Promise<User>;
    updateName(userId: number, name: string): Promise<User>;
    updateEmail(userId: number, email: string): Promise<User>;
    updatePassword(userId: number, password: string): Promise<User>;
}
