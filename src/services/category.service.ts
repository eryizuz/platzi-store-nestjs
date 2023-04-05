import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/dtos/categories.dto';
import { Category } from 'src/entities/category.entity';

@Injectable()
export class CategoryService {
  private counterId = 1;

  private categories: Category[] = [
    {
      id: 1,
      name: 'Google',
    },
  ];

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    const category = this.categories.find((p) => p.id === id);
    if (!category) {
      throw new NotFoundException('category not found');
    }

    return category;
  }

  create(payload: CreateCategoryDto) {
    const newcategory = {
      id: this.counterId + 1,
      ...payload,
    };

    this.categories.push(newcategory);
    return newcategory;
  }

  update(id: number, payload: UpdateCategoryDto) {
    const category = this.findOne(id);
    if (category) {
      const index = this.categories.findIndex((p) => p.id === id);
      this.categories[index] = { ...this.categories[index], ...payload };
      return this.categories[index];
    }
  }
  remove(id: number) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`category #${id} not found`);
    }
    this.categories.splice(index, 1);
    return true;
  }
}
