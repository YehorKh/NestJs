import { Module } from '@nestjs/common';
import { CategoryImageController } from './category-image.controller';
import { CategoryImage } from './entity/category-image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryImageService } from './category-image.service';
import { ContentService } from 'src/content/content.service';
import { MinioService } from 'nestjs-minio-client';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryImage])],

})
export class CategoryImageModule {}
