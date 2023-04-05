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
import { CreateBrandDto, UpdateBrandDto } from 'src/dtos/brands.dto';
import { Brand } from 'src/entities/brand.entity';
import { BrandService } from 'src/services/brand.service';

@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandService) {}
  @Get('/:brandId')
  getOne(@Param('brandId', ParseIntPipe) brandId: number): Brand {
    return this.brandService.findOne(brandId);
  }

  @Get('/')
  @HttpCode(HttpStatus.ACCEPTED)
  getAll(@Query('limit') limit: number, @Query('skip') skip: number): Brand[] {
    // return `This is the limit: ${limit}, and skip: ${skip}`;
    return this.brandService.findAll();
  }

  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandService.create(payload);
  }
  @Put(':id')
  update(@Param('id') brandId: string, @Body() payload: UpdateBrandDto) {
    return this.brandService.update(+brandId, payload);
  }

  @Delete(':id')
  delete(@Param('id') brandId: string) {
    return this.brandService.remove(+brandId);
  }
}
