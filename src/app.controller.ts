import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/products/:id')
  getProduct(@Param() productId: string): string {
    return `this is the id of the product: ${productId}`;
  }

  @Get('/products')
  getProducts(
    @Query('limit') limit: number,
    @Query('skip') skip: number,
  ): string {
    return `This is the limit: ${limit}, and skip: ${skip}`;
  }

  @Get('/categories/:id/products/:productId')
  getCategories(
    @Param('productId') productId: string,
    @Param('id') id: string,
  ): string {
    return `this is the id of the product: ${productId} and id: ${id}`;
  }
}
