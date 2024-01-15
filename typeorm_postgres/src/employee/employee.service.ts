import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee) private readonly employeeRepo: Repository<Employee>
  ) { }

  create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = new Employee()
    employee.username = createEmployeeDto.username;
    employee.password = createEmployeeDto.password;
    employee.role = createEmployeeDto.role;

    return this.employeeRepo.save(employee)
  }

  findAll() {
    return this.employeeRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
