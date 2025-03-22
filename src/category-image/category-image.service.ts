import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryImage } from './entity/category-image.entity';
import { CreateCategoryImageDto } from './dto/create-category-image.dto';
import { UpdateCategoryImageDto } from './dto/update-category-image.dto';
import { ContentService } from 'src/content/content.service';
import { warn } from 'console';
import { MinioClient } from 'nestjs-minio-client';
@Injectable()
export class CategoryImageService {
  constructor(
    @InjectRepository(CategoryImage)
    private readonly categoryImageRepository: Repository<CategoryImage>,
    private readonly minioService: ContentService,
  ) {}

  async create(createCategoryImageDto: CreateCategoryImageDto, file: Express.Multer.File) {
   const imageUrl = await this.minioService.uploadFile('113', file);
   const categoryImage = this.categoryImageRepository.create({ ...createCategoryImageDto, imageSrc: imageUrl.url});
   warn(imageUrl.url)
   return this.categoryImageRepository.save(categoryImage);
 }

  findAll() {
    return this.categoryImageRepository.find();
  }

  findOne(id: number) {
    return this.categoryImageRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCategoryImageDto: UpdateCategoryImageDto) {
    await this.categoryImageRepository.update(id, updateCategoryImageDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.categoryImageRepository.delete(id);
    return { deleted: true };
  }
}