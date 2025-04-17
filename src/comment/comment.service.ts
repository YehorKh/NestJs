import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { warn } from 'console';
import { Product } from 'src/products/entities/product.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

  ) {}

  async findAll(): Promise<Comment[]> {
   return this.commentRepository.find({
     relations: ['user', 'product'],
   });
 }
 
 async findByProduct(productId: number): Promise<Comment[]> {
   return this.commentRepository.find({
     where: { product: {id: productId} },
     relations: ['user', 'product'],
   });
 }
 
  async create(userId:number,dto: CreateCommentDto): Promise<Comment> {
    warn(dto)
    const comment = this.commentRepository.create({content:dto.content,
      rating: dto.rating,
      product:{id:dto.productId},
      user:{id:userId}});
    return this.commentRepository.save(comment);
  }

  async delete(id: number): Promise<void> {
    await this.commentRepository.delete(id);
  }
}
