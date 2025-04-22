export declare class RegisterUserDto {
    name: string;
    email: string;
    password: string;
    defaultShippingAddress?: string;
    phoneNumber?: string;
}
export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    defaultShippingAddress?: string;
    phoneNumber?: string;
    roles?: string[];
}
