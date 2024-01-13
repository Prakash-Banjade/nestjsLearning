import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeesService } from 'src/employees/employees.service';

@Injectable()
export class AuthService {
    constructor(
        private employeeService: EmployeesService,
        private readonly jwtService: JwtService,
    ) { }

    async signIn(username: string, password: string) {
        const foundEmployee = this.employeeService.findOne(username)

        if (!foundEmployee) throw new BadRequestException('No employee with this username.')

        if (foundEmployee.password !== password) throw new UnauthorizedException("Invalid password")

        const payload = {sub: foundEmployee.id, role: foundEmployee.role};

        return {
            acces_token: await this.jwtService.signAsync(payload)
        }
    }
}
