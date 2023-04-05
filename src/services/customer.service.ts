import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/dtos/customers.dto';
import { Customer } from 'src/entities/customer.entity';

@Injectable()
export class CustomerService {
    private counterId = 1;

    private customers: Customer[] = [
      {
        id: 1,
        name: 'Google',
      },
    ];
  
    findAll() {
      return this.customers;
    }
  
    findOne(id: number) {
      const customer = this.customers.find((p) => p.id === id);
      if (!customer) {
        throw new NotFoundException('customer not found');
      }
  
      return customer;
    }
  
    create(payload: CreateCustomerDto) {
      const newcustomer = {
        id: this.counterId + 1,
        ...payload,
      };
  
      this.customers.push(newcustomer);
      return newcustomer;
    }
  
    update(id: number, payload: UpdateCustomerDto) {
      const customer = this.findOne(id);
      if (customer) {
        const index = this.customers.findIndex((p) => p.id === id);
        this.customers[index] = { ...this.customers[index], ...payload };
        return this.customers[index];
      }
    }
    remove(id: number) {
      const index = this.customers.findIndex((item) => item.id === id);
      if (index === -1) {
        throw new NotFoundException(`customer #${id} not found`);
      }
      this.customers.splice(index, 1);
      return true;
    }
}
