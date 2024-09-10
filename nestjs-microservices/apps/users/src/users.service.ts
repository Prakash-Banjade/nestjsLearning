import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users: string[] = ['user1', 'user2', 'user3'];
  
  findAll(): string[] {
    return this.users;
  }
}
