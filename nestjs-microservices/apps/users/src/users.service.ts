import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/create-uesr.dto';

@Injectable()
export class UsersService {
  private users: UserDto[] = [
    {
      id: 1,
      name: 'John',
      email: 'johndoe@me.com',
      password: '1234'
    },
    {
      id: 2,
      name: 'Jane',
      email: 'janedoe@me.com',
      password: '1234'
    }
  ]

  findAll() {
    return this.users;
  }
}
