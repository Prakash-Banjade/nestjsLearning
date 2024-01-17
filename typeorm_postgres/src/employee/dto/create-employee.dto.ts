import { IsEnum, IsNotEmpty, IsString, Length, Matches } from "class-validator";
import { passwordRegex } from "../entities/employee.entity";
import { EmployeeRole } from "src/types.globalType";

export class CreateEmployeeDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    @Matches(passwordRegex.regExp,)
    @Length(8, 64)
    password: string;

    @IsEnum(EmployeeRole)
    role: EmployeeRole
}
