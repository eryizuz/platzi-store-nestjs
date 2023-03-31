import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/products.dto';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductService {
  private counterId = 1;

  private products: Product[] = [
    {
      id: 1,
      name: 'martillo',
      description: 'description....',
      price: 1,
      image: 'asd',
      stock: 1,
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  create(payload: CreateProductDto) {
    const newProduct = {
      id: this.counterId + 1,
      ...payload,
    };

    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateProductDto) {
    const product = this.findOne(id);
    if (product) {
      const index = this.products.findIndex((p) => p.id === id);
      this.products[index] = { ...this.products[index], ...payload };
      return this.products[index];
    }
  }
  remove(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.products.splice(index, 1);
    return true;
  }
}
