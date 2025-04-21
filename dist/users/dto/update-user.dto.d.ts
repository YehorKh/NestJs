import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
export declare class UpdateShippingAddressDto {
    address: string;
}
export declare class UpdatePhoneNumberDto {
    phoneNumber: string;
}
export {};
