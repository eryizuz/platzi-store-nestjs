import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ParseIntPipe } from 'src/commo/parse-int/parse-int.pipe';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/dtos/categories.dto';
import { Category } from 'src/entities/category.entity';
import { CategoryService } from 'src/services/category.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoryService) {}
  @Get('/:categoryId')
  getOne(@Param('categoryId', ParseIntPipe) categoryId: number): Category {
    return this.categoryService.findOne(categoryId);
  }
  

  @Get('/')
  @HttpCode(HttpStatus.ACCEPTED)
  getAll(
    @Query('limit') limit: number,
    @Query('skip') skip: number,
  ): Category[] {
    // return `This is the limit: ${limit}, and skip: ${skip}`;
    return this.categoryService.findAll();
  }

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoryService.create(payload);
  }
  @Put(':id')
  update(@Param('id') categoryId: string, @Body() payload: UpdateCategoryDto) {
    return this.categoryService.update(+categoryId, payload);
  }

  @Delete(':id')
  delete(@Param('id') categoryId: string) {
    return this.categoryService.remove(+categoryId);
  }
}
