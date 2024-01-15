import { IsEnum, IsNotEmpty, IsString, Length, Matches } from "class-validator";
import { EmployeeRole } from "../entities/employee.entity";

const pwdRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)

export class CreateEmployeeDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    @Matches(pwdRegex)
    @Length(8, 64)
    password: string;

    @IsEnum(EmployeeRole)
    role: EmployeeRole
}
