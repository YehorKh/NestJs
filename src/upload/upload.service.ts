import { BadRequestException, Injectable, NotFoundException, UploadedFile } from '@nestjs/common';
import { ok } from 'assert';
import { warn } from 'console';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ProductImageService } from 'src/products/product-image/product-image.service';
@Injectable()
export class UploadService {
   constructor(private readonly cloudinaryService: CloudinaryService,
   private readonly productImageService: ProductImageService) {}
   async uploadFile(productId: number,@UploadedFile() file: Express.Multer.File) {
      try
    {
      file.buffer;
    }
      catch(error)
      {
         throw new BadRequestException("File Exception");
      }
      const uploadResult = await this.cloudinaryService.uploadImage(file);
      this.productImageService.addImage(productId, uploadResult.secure_url)

      return  "Successfull upload";
   }
}
