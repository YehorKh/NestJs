import { BadRequestException, Injectable, NotFoundException, UploadedFile } from '@nestjs/common';
import { ok } from 'assert';
import { warn } from 'console';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ProductImageService } from 'src/products/product-image/product-image.service';
import { ContentService } from 'src/content/content.service';
@Injectable()
export class UploadService {
   constructor(private readonly cloudinaryService: CloudinaryService,
   private readonly productImageService: ProductImageService,
   private readonly minioService: ContentService) {}
   async uploadFile(productId: number,@UploadedFile() file: Express.Multer.File) {
      warn(file)
      const uploadResult = await this.minioService.uploadFile('my-bucket',file);
      this.productImageService.addImage(productId,uploadResult.url)

      return uploadResult.url;
   }
}
