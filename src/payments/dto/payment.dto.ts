
 import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class PaymentDto {
   @ApiProperty()
   amount: number;
   @ApiProperty()
 currency: string
}