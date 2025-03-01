import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { warn } from 'console';
@Controller('upload')
export class UploadController {
  constructor(private readonly cloudinaryService: CloudinaryService,private readonly uploadService: UploadService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
   schema: {
     type: 'object',
     properties: {
       file: { type: 'string', format: 'binary' },
       productId: { type: 'integer' }, 
     },
   },
 })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(productId:number,@UploadedFile() file: Express.Multer.File) {
    
      return this.uploadService.uploadFile(productId,file);
  }
}