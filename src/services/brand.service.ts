import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from 'src/dtos/brands.dto';
import { Brand } from 'src/entities/brand.entity';

@Injectable()
export class BrandService {
  private counterId = 1;

  private brands: Brand[] = [
    {
      id: 1,
      name: 'Google',
    },
  ];

  findAll() {
    return this.brands;
  }

  findOne(id: number) {
    const brand = this.brands.find((p) => p.id === id);
    if (!brand) {
      throw new NotFoundException('brand not found');
    }

    return brand;
  }

  create(payload: CreateBrandDto) {
    const newbrand = {
      id: this.counterId + 1,
      ...payload,
    };

    this.brands.push(newbrand);
    return newbrand;
  }

  update(id: number, payload: UpdateBrandDto) {
    const brand = this.findOne(id);
    if (brand) {
      const index = this.brands.findIndex((p) => p.id === id);
      this.brands[index] = { ...this.brands[index], ...payload };
      return this.brands[index];
    }
  }
  remove(id: number) {
    const index = this.brands.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`brand #${id} not found`);
    }
    this.brands.splice(index, 1);
    return true;
  }
}
