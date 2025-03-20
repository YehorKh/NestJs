import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductImage } from '../entities/product-images.entity';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductImageService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

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
