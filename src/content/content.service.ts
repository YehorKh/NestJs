import { Injectable } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import * as fs from 'fs';
import { warn } from 'console';
@Injectable()
export class ContentService {
   constructor(private readonly minioService: MinioService) {}


   async createBucket(bucketName: string) {
    try {
      const bucketExists = await this.minioService.client.bucketExists(bucketName);
      if (!bucketExists) {
        await this.minioService.client.makeBucket(bucketName, 'us-east-1'); // Укажи регион, если нужно
        console.log(`Bucket "${bucketName}" успешно создан.`);
      } else {
        console.log(`Bucket "${bucketName}" уже существует.`);
      }
    } catch (error) {
      console.error('Ошибка при создании bucket:', error);
      throw error;
    }
  }

   async uploadFile(bucketName: string, file: Express.Multer.File) {
    const fileName = `${Date.now()}-${file.originalname}`;
  
    await this.minioService.client.putObject(bucketName, fileName, file.buffer, file.size, {
      'Content-Type': file.mimetype,
    });
  
    return { url: `http://${process.env.MINIO_URL}:${process.env.MINIO_PORT}/${bucketName}/${fileName}` };
  }
}
