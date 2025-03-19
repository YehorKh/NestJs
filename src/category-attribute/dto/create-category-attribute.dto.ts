import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryAttributeDto {
   @ApiProperty()
   category_id: number; 
   @ApiProperty()
   attribute_id: number; 
 }