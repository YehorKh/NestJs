import { Controller, Post, Get, Delete, Body, Req, UseGuards, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddToCartDto } from './dto/cart.dto';
import { warn } from 'console';
@ApiTags('cart')
@ApiBearerAuth() 
@UseGuards(AuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({  })
  async addToCart(@Req() req, @Body() dto: AddToCartDto) {
    return this.cartService.addToCart(req.user.id, dto);
  }

  @Get()
  @ApiOperation({})
  async getCart(@Req() req) {
    return this.cartService.getCart(req.user.id);
  }

  @Delete(':productId')
  @ApiOperation({ })
  async removeFromCart(@Req() req, @Param('productId') productId: number) {
    return this.cartService.removeFromCart(req.user.id, productId);
  }
}