import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { EmailVerification } from 'src/verification/entities/verification.entity';
export declare class UsersService {
    private readonly userRepository;
    private verificationRepo;
    private readonly bcryptService;
    constructor(userRepository: Repository<User>, verificationRepo: Repository<EmailVerification>, bcryptService: BcryptService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findOneByName(name: string): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<void>;
}
