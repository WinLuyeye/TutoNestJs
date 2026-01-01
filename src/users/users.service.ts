import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'types/userTypes';
import { randomUUID } from 'crypto';

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

  // CREATE
  create(user: Omit<User, 'id'>): User {
    const newUser: User = {
      id: randomUUID(),
      ...user,
    };

    this.users.push(newUser);
    return newUser;
  }

  // READ - all
  findAll(): User[] {
    return this.users;
  }

  // READ - one
  findOne(id: string): User {
    const user = this.users.find(u => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  // UPDATE
  update(id: string, data: Partial<Omit<User, 'id'>>): User {
    const user = this.findOne(id);

    const updatedUser = { ...user, ...data };
    this.users = this.users.map(u => (u.id === id ? updatedUser : u));

    return updatedUser;
  }

  // DELETE
  remove(id: string): void {
    const user = this.findOne(id);
    this.users = this.users.filter(u => u.id !== user.id);
  }
}
