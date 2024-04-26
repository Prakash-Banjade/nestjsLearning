import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User as UserType } from '../graphql'

@Injectable()
export class UsersService {
  users: UserType[] = [
    {
      id: 1,
      name: 'John',
      email: 'j@j.com'
    },
    {
      id: 2,
      name: 'Lili',
      email: 'li@li.com',
    }
  ]

  create(createUserInput: CreateUserInput) {
    this.users.push(createUserInput)
    return {
      success: 'ok',
      user: createUserInput
    }
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find(user => user.id === id)
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    const existingUser = this.users.find(user => user.id === id)
    if (!existingUser) throw new Error('User not found')

    this.users.forEach(user => {
      if (user.id === id) {
        user.name = updateUserInput.name
        user.email = updateUserInput.name
      }
    })

    return updateUserInput
  }

  remove(id: number) {
    const existingUser = this.users.find(user => user.id === id)
    if (!existingUser) throw new Error('User not found')

    this.users = this.users.filter(user => user.id !== id)

    return existingUser
  }
}
