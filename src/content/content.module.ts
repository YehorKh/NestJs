import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { MinioModule, MinioService } from 'nestjs-minio-client';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
   imports: [MinioModule],
   providers: [ContentService,MinioService],
   exports: [ContentService,MinioService], 
 })
 export class ContentModule {}