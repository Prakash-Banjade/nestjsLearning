import { BadRequestException, Injectable, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { EmployeeRole } from 'src/types.globalType';
import { FindQueryDto } from './dto/find-query.dto';
import { returlVal } from 'src/utils/returnVal';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee) private readonly employeeRepo: Repository<Employee>
  ) { }

  async create(createEmployeeDto: CreateEmployeeDto) {
    return await this.employeeRepo.save(createEmployeeDto)
  }

  async findAll(queries: FindQueryDto) {
    const { limit = 10, page = 1, role } = queries;
    const skip = (page - 1) * limit

    if (role) return await this.filterByRole(role);

    console.log(limit, skip)
    const [employees, total] = await this.paginateEmployees(limit, skip)
    const hasMore = total - (limit * page) > 0;

    return ({ employees, hasMore, total, page: page })
  }

  async findOne(id: string) {
    const employee = await this.employeeRepo.findOne({
      where: {
        id,
      }
    })

    if (!employee) throw new BadRequestException('No employee found with given id')

    return {
      status: 'success',
      data: employee
    }
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    if ('password' in updateEmployeeDto) throw new BadRequestException("Can't update field 'password'")

    const employee = await this.employeeRepo.findOneOrFail({ where: { id } })
    const result = await this.employeeRepo.save(Object.assign(employee, updateEmployeeDto)); // can't save directly because hashPassword() function before udpate won't be triggered.
    return returlVal(result);
  }

  async remove(id: string) {
    const employee = await this.findOne(id)
    const result = await this.employeeRepo.softRemove(employee.data);
    return returlVal(result);
  }

  private async filterByRole(role: EmployeeRole): Promise<Employee[]> {
    return this.employeeRepo.find({
      where: {
        role,
      },
    });
  }

  private async paginateEmployees(limit: number, skip: number): Promise<[Employee[], number]> {
    const employees = this.employeeRepo.find({
      take: limit,
      skip,
    });
    const total = this.employeeRepo.count();

    return await Promise.all([employees, total]);
  }
}
