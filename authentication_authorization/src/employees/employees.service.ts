import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { v4 as uuidV4 } from 'uuid'
import bcrypt from 'bcrypt'

@Injectable()
export class EmployeesService {

  private readonly employees: Employee[] = [
    {
      id: "16c8ade8-50d1-4eee-a833-9651eebb4c7c",
      username: "prakash122",
      password: "prakash122",
      role: "ADMIN",
      createdAt: "2024-01-13T17:31:06.667Z",
    }
  ]

  async create(createEmployeeDto: CreateEmployeeDto) {
    const { username, password, role } = createEmployeeDto;

    if (this.employees.find(emp => emp.username === username)) throw new ConflictException('Duplicate Employee username. Employee with this username exists.');

    // const hashedPwd = await bcrypt.hash(password, 10);

    const newEmployee: Employee = {
      id: uuidV4(),
      username,
      password,
      role: role || 'EMPLOYEE',
      createdAt: new Date().toISOString()
    }

    this.employees.push(newEmployee);

    return newEmployee;
  }

  findAll() {
    return this.employees;
  }

  findOne(username: string) {
    const foundEmployee = this.employees.find(emp => emp.username === username);

    if (!foundEmployee) throw new BadRequestException('Invalid username')

    return foundEmployee;
  }

  update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: string) {
    return this.employees.filter(emp => emp.id !== id);
  }
}
