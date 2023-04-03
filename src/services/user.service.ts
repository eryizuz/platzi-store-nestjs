import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { CreateUserDto, UpdateUserDto } from 'src/dtos/users.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  private counterId = 1;

  private users: User[] = [
    {
      id: 1,
      name: 'jesus',
      email: 'jezlopez@gmail.com',
      lastname: 'lopez',
      rol: 'ADMIN',
      username: 'eryizuz',
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((p) => p.id === id);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  create(payload: CreateUserDto) {
    const newUser = {
      id: this.counterId + 1,
      ...payload,
    };

    this.users.push(newUser);
    return newUser;
  }

  update(id: number, payload: UpdateUserDto) {
    const user = this.findOne(id);
    if (user) {
      const index = this.users.findIndex((p) => p.id === id);
      this.users[index] = { ...this.users[index], ...payload };
      return this.users[index];
    }
  }
  remove(id: number) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`user #${id} not found`);
    }
    this.users.splice(index, 1);
    return true;
  }
}
