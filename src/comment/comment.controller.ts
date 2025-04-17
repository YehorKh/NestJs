import {
   Controller,
   Get,
   Post,
   Delete,
   Body,
   Param,
   UseGuards,
   Req,
 } from '@nestjs/common';
 import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
 import { Request } from 'express';
 import { CommentService } from './comment.service';
 import { Comment } from './entities/comment.entity';
 import { AuthGuard } from 'src/auth/auth.guard';
  import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentResponseDto } from './dto/comment-response.dto';
 
 @ApiTags('Comments')
 @Controller('comments')
 export class CommentController {
   constructor(private readonly commentService: CommentService) {}
   @ApiBearerAuth()
   @UseGuards(AuthGuard)
   @Post()
   @ApiResponse({ status: 201, description: 'Comment created.' })
   async create(
     @Body() commentDto: CreateCommentDto,
     @Req() req: Request,
   ): Promise<Comment> {
     const user = req.user as any; 
     return this.commentService.create(
      user.id,
      commentDto,
     );
   }
@Get()
async getAll(): Promise<CommentResponseDto[]> {
  const comments = await this.commentService.findAll();
  return comments.map((comment) => ({
    id: comment.id,
    content: comment.content,
    rating: comment.rating,
    date: comment.date,
    user: {
      id: comment.user.id,
      name: comment.user.name,
    },
    product: {
      id: comment.product.id,
      name: comment.product.name,
    },
  }));
}
   @Get('product/:productId')
   async getByProduct(@Param('productId') productId: number): Promise<CommentResponseDto[]> {
    const comments = await this.commentService.findByProduct(productId);
    return comments.map((comment) => ({
      id: comment.id,
      content: comment.content,
      rating: comment.rating,
      date: comment.date,
      user: {
        id: comment.user.id,
        name: comment.user.name,
      },
      product: {
        id: comment.product.id,
        name: comment.product.name,
      },
    }));
   }
   @ApiBearerAuth()

   @UseGuards(AuthGuard)
   @Delete(':id')
   async delete(@Param('id') id: number): Promise<void> {
     return this.commentService.delete(id);
   }
 }
 