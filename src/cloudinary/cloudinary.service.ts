import { Inject, Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { warn } from 'console';
@Injectable()
export class CloudinaryService {
   constructor(@Inject('CLOUDINARY') private cloudinaryInstance: typeof cloudinary) {}
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse> {
    
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) {
          return reject(error);
        }

        //warn( result.secure_url)
        resolve(result);
      });
    
      toStream(file.buffer).pipe(upload);
    });
  }
}