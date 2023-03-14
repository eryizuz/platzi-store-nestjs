import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get('/:id/products/:productId')
  getCategories(
    @Param('productId') productId: string,
    @Param('id') id: string,
  ): string {
    return `this is the id of the product: ${productId} and id: ${id}`;
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'Hola',
      payload,
    };
  }
}
