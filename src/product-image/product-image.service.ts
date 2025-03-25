import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductImage } from '../products/entities/product-images.entity';
import { Product } from '../products/entities/product.entity';
import { ContentService } from 'src/content/content.service';
import { warn } from 'console';

@Injectable()
export class ProductImageService {
  constructor(
    @InjectRepository(ProductImage) private readonly productImageRepository: Repository<ProductImage>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    private readonly contentService: ContentService,
  ) {}
  async create(productId: number, file: Express.Multer.File) {
    const product = await this.productRepository.findOne({ where: { id: productId } , relations: [ 'images'] });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
    const imageUrl = await this.contentService.uploadFile('113', file);
    warn(imageUrl.url)
    let numer = 0
    if(product.images != null){
    numer = Math.max(...product.images.map(img => img.numer)) +1;
    }
    const newImage = this.productImageRepository.create({ imageUrl:imageUrl.url, product, numer});

    return this.productImageRepository.save(newImage);
  }
  async addImage(productId: number, imageUrl: string): Promise<ProductImage> {
    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
    const numer = Math.max(...product.images.map(img => img.numer)) +1;
    
    const newImage = this.productImageRepository.create({ imageUrl, product, numer});
    return this.productImageRepository.save(newImage);
  }

  async getImagesByProduct(productId: number): Promise<ProductImage[]> {
    return this.productImageRepository.find({
      where: { product: { id: productId } },
    });
  }

  async getImageById(imageId: number): Promise<ProductImage> {
    const image = await this.productImageRepository.findOne({ where: { id: imageId } });
    if (!image) {
      throw new NotFoundException(`Image with ID ${imageId} not found`);
    }
    return image;
  }

  async deleteImage(imageId: number): Promise<void> {
    const result = await this.productImageRepository.delete(imageId);
    if (result.affected === 0) {
      throw new NotFoundException(`Image with ID ${imageId} not found`);
    }
    
  }
  
}
