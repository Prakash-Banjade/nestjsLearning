import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) { }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: string) {
    const existingUser = await this.usersRepository.findOneBy({ id });
    if (!existingUser) throw new NotFoundException('User not found');

    return existingUser;
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const existingUser = await this.findOne(id);

    // TODO: finalize how to store image

    Object.assign(existingUser, {
      name: updateUserInput.name,
      email: updateUserInput.email,
      // image: updateUserInput.image
    });

    return await this.usersRepository.save(existingUser);
  }

  async remove(id: string) {
    const existingUser = await this.findOne(id);
    return await this.usersRepository.softRemove(existingUser);
  }
}
