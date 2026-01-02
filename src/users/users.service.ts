import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { User } from 'types/userTypes';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: '1',
      name: 'Admin',
      email: 'admin@admin.com',
      role: 'admin',
    },
    {
      id: '2',
      name: 'User',
      email: 'user@user.com',
      role: 'user',
    },
  ];
  findAll(): User[] {
    if (this.users.length === 0) {
      throw new NotFoundException('No users found');
    }
    return this.users;
  }
  findOne(id: string): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
  create(user: User): User {
    const userId = (this.users.length + 1).toString();
    const newUser = { ...user, id: userId };
    this.users.push(newUser);
    return newUser;
  }
  update(id: string, user: User): User {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    this.users[index] = { ...this.users[index], ...user };
    return this.users[index];
  }
  delete(id: string): string {
    this.users = this.users.filter((user) => user.id !== id);
    return 'User deleted successfully';
  }
}
