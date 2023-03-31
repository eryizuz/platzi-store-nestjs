import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { Body, Delete, HttpCode, Post, Put } from '@nestjs/common/decorators';
import { ParseIntPipe } from 'src/commo/parse-int/parse-int.pipe';
import { Product } from 'src/entities/product.entity';
import { ProductService } from 'src/services/product.service';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

@Controller('products')
export class ProductsController {
  constructor(private productServise: ProductService) {}
  @Get('/:productId')
  getOne(@Param('productId', ParseIntPipe) productId: number): Product {
    return this.productServise.findOne(productId);
  }

  @Get('/')
  @HttpCode(HttpStatus.ACCEPTED)
  getAll(
    @Query('limit') limit: number,
    @Query('skip') skip: number,
  ): Product[] {
    // return `This is the limit: ${limit}, and skip: ${skip}`;
    return this.productServise.findAll();
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productServise.create(payload);
  }
  @Put(':id')
  update(@Param('id') productId: string, @Body() payload: UpdateProductDto) {
    return this.productServise.update(+productId, payload);
  }

  @Delete(':id')
  delete(@Param('id') productId: string) {
    return this.productServise.remove(+productId);
  }
}
