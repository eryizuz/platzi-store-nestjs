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
import { CreateCustomerDto, UpdateCustomerDto } from 'src/dtos/customers.dto';
import { Customer } from 'src/entities/customer.entity';
import { CustomerService } from 'src/services/customer.service';
@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomerService) {}
  @Get('/:customerId')
  getOne(@Param('customerId', ParseIntPipe) customerId: number): Customer {
    return this.customerService.findOne(customerId);
  }

  @Get('/')
  @HttpCode(HttpStatus.ACCEPTED)
  getAll(
    @Query('limit') limit: number,
    @Query('skip') skip: number,
  ): Customer[] {
    // return `This is the limit: ${limit}, and skip: ${skip}`;
    return this.customerService.findAll();
  }

  @Post()
  create(@Body() payload: CreateCustomerDto) {
    return this.customerService.create(payload);
  }
  @Put(':id')
  update(@Param('id') customerId: string, @Body() payload: UpdateCustomerDto) {
    return this.customerService.update(+customerId, payload);
  }

  @Delete(':id')
  delete(@Param('id') customerId: string) {
    return this.customerService.remove(+customerId);
  }
}
