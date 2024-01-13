import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.interface';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  private users: (User & { id: string })[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'ADMIN',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'USER',
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      role: 'INTERN',
    },
    {
      id: '4',
      name: 'Alice Brown',
      email: 'alice.brown@example.com',
      role: 'USER',
    },
    {
      id: '5',
      name: 'Charlie Wilson',
      email: 'charlie.wilson@example.com',
      role: 'INTERN',
    },
  ];

  findAll(role?: string) {
    if (role) {
        const usersWithRole = this.users.filter((user) => user.role === role);

        if (!usersWithRole.length) throw new NotFoundException(`No user found with role ${role}`)

        return usersWithRole;
    };
    return this.users;
  }

  findOne(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException("user not found");

    return user;
  }

  create(data: CreateUserDto) {
    const latestId = Math.max(...this.users.map((user) => Number(user.id)));

    const newUser = {
      id: String(latestId + 1),
      ...data,
    };

    this.users = [...this.users, newUser];

    return newUser;
  }

  update(data: UpdateUserDto & { id: string }) {
    this.users = this.users.map((user) =>
      user.id === data.id ? { ...user, ...data } : user,
    );

    return this.findOne(data.id);
  }

  delete(id: string) {
    const deletedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);

    return deletedUser;
  }
}
