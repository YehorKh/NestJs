import { CartItem } from 'src/cart/entities/cart.entity';
import { Comment } from 'src/comment/entities/comment.entity';
export declare class User {
    id: number;
    name: string;
    roles: string[];
    email: string;
    password: string;
    emailVerified: boolean;
    cart: CartItem[];
    comments: Comment[];
}
