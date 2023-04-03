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
import { CreateUserDto, UpdateUserDto } from 'src/dtos/users.dto';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/services/user.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}
  @Get('/:userId')
  getOne(@Param('userId', ParseIntPipe) userId: number): User {
    return this.userService.findOne(userId);
  }

  @Get('/')
  @HttpCode(HttpStatus.ACCEPTED)
  getAll(@Query('limit') limit: number, @Query('skip') skip: number): User[] {
    // return `This is the limit: ${limit}, and skip: ${skip}`;
    return this.userService.findAll();
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }
  @Put(':id')
  update(@Param('id') userId: string, @Body() payload: UpdateUserDto) {
    return this.userService.update(+userId, payload);
  }

  @Delete(':id')
  delete(@Param('id') userId: string) {
    return this.userService.remove(+userId);
  }
}
