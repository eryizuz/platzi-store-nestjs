import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products.controller';
import { CategoriesController } from './controllers/categories.controller';
import { ProductService } from './services/product.service';
import { BrandsController } from './controllers/brands.controller';
import { UsersController } from './controllers/users.controller';
import { CustomersController } from './controllers/customers.controller';
import { UserService } from './services/user.service';

@Module({
  imports: [],
  controllers: [AppController, ProductsController, CategoriesController, BrandsController, UsersController, CustomersController],
  providers: [AppService, ProductService, UserService],
})
export class AppModule {}
