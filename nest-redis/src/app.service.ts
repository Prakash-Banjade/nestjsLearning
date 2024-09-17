import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>
  ) { }

  getHello() {
    
    console.log('hello world')
    
    return this.usersRepo.find();
  }

  mockUsers = [
    {
      name: 'John',
    },
    {
      name: 'Jane',
    },
    {
      name: 'Joe',
    }
  ]

  async setUsers() {
    await this.usersRepo.save(this.mockUsers);
  }
}
