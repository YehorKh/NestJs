import { UsersService } from './users.service';
import { UpdatePhoneNumberDto, UpdateShippingAddressDto, UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UpdateNameDto } from './dto/update-name.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    update(req: any, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<void>;
    updateShippingAddress(req: any, updateShippingAddressDto: UpdateShippingAddressDto): Promise<User>;
    updatePhoneNumber(updatePhoneNumberDto: UpdatePhoneNumberDto, req: any): Promise<User>;
    updateName(req: any, updateNameDto: UpdateNameDto): Promise<User>;
    updateEmail(req: any, updateEmailDto: UpdateEmailDto): Promise<User>;
    updatePassword(req: any, updatePasswordDto: UpdatePasswordDto): Promise<User>;
}
