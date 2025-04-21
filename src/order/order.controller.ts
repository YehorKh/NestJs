import {
   Controller,
   Post,
   Get,
   Param,
   Body,
   UseGuards,
   Request,
   ParseIntPipe,
 } from '@nestjs/common';
 import { OrdersService } from './order.service';
 import { AuthGuard } from 'src/auth/auth.guard';
 import { CreateOrderDto } from './dto/create-order.dto';
 import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
 import { Order } from './entities/order.entity';
import { User } from 'src/users/entities/user.entity';
 
 @ApiTags('orders')
 @ApiBearerAuth()
 @UseGuards(AuthGuard)
 @Controller('orders')
 export class OrdersController {
   constructor(private readonly ordersService: OrdersService) {}
 
   @Post()
   @ApiOperation({ })
   @ApiResponse({ status: 201, description: 'Order created', type: Order })
   async createOrder(
     @Body() createOrderDto: CreateOrderDto,
     @Request() req,
   ): Promise<Order> {
     return this.ordersService.createOrder(req.user.id, createOrderDto);
   }
 
   @Get()
   @ApiOperation({  })
   @ApiResponse({ status: 200, description: 'List of orders', type: [Order] })
   async getUserOrders(@Request() req): Promise<Order[]> {
     return this.ordersService.getUserOrders(req.user.id);
   }
 
   @Get(':id')
   @ApiOperation({  })
   @ApiResponse({ status: 200, description: 'Order details', type: Order })
   @ApiResponse({ status: 404, description: 'Order not found' })
   async getOrder(
     @Request() req,
   ): Promise<Order> {
     return this.ordersService.getOrderById(req.user.id);
   }
 }