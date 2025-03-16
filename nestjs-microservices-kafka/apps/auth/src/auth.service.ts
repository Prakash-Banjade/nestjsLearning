import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  private users = [
    {
      userId: 'user-1',
      username: 'user1',
      password: 'password1'
    },
    {
      userId: 'user-2',
      username: 'user2',
      password: 'password2'
    }
  ]

  getUser(userId: string) {
    return this.users.find(user => user.userId === userId);
  }
}
