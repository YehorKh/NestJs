import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto {
   name?: string;
   price?: number;
   categoryId?: number;
   attributes?: Array<{ attribute_name: string; value: string }>;
   images?: Array<{ imageUrl: string; numer?: number }>;
 }
 
 export class ProductResponseDto {
   product_id: number;
   product_name: string;
   product_price: number;
   category_id: number;
   category_name: string;
   attributes: Array<{ attribute_name: string; value: string }>;
   images: Array<{ id: number; imageUrl: string; numer: number }>;
 }
 