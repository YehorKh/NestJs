import { Injectable } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import * as fs from 'fs';
import { warn } from 'console';
@Injectable()
export class ContentService {
   constructor(private readonly minioService: MinioService) {}

  async uploadFile(bucket: string, file: Express.Multer.File) {
   const fileName = `${Date.now()}-${file.originalname}`; 
   await this.minioService.client.putObject(bucket, fileName, file.buffer);
   
   return {
     message: 'Файл загружен',
     url: await this.getFileUrl(bucket, fileName),
   };
  }
  async getFileUrl(bucket: string, fileName: string) {
   return this.minioService.client.presignedUrl('GET', bucket, fileName, 60 * 60);
 }
}
