import { Controller, Get, Post, Body, Param, Query, Patch, Delete, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductImageService } from './product-image.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiQuery } from '@nestjs/swagger';
@Controller('product-image')
export class ProductImageController {
   constructor(private readonly productImage: ProductImageService,
       ) {}
   @Delete(':id')
   async remove(@Param('id') id: number) {
      await this.productImage.deleteImage(id);
      return { deleted: true };
   }
   @Post(':id/images')
         @ApiConsumes('multipart/form-data')
         @ApiBody({
           schema: {
             type: 'object',
             properties: {
               file: { type: 'string', format: 'binary' },
               productId: { type: 'number' },
             },
           },
         })
         @UseInterceptors(FileInterceptor('file'))
         async createImage(
           @UploadedFile() file: Express.Multer.File,
           productId: number,
         ) {
           return this.productImage.create(productId, file);
         }
}
