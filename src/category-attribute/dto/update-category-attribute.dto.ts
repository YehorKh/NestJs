import { ApiProperty } from "@nestjs/swagger";

export class UpdateCategoryAttributeDto {
   @ApiProperty()
   category_id?: number; 
   @ApiProperty()
   attribute_id?: number; 
 }