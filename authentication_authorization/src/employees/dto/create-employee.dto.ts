import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateEmployeeDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsEnum(['ADMIN', 'MANAGER', 'EMPLOYEE'])
    role?: 'ADMIN' | 'MANAGER' | 'EMPLOYEE'
}
