import { UsersService } from './users.service';
import { UpdatePhoneNumberDto, UpdateShippingAddressDto, UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<void>;
    updateShippingAddress(userId: number, updateShippingAddressDto: UpdateShippingAddressDto): Promise<User>;
    updatePhoneNumber(userId: number, updatePhoneNumberDto: UpdatePhoneNumberDto): Promise<User>;
}
