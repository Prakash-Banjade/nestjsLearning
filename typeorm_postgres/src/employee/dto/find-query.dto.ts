import { Transform } from "class-transformer";
import { IsEnum, IsInt, IsNumber, IsOptional } from "class-validator";
import { EmployeeRole } from "src/types.globalType";

export class FindQueryDto {
    @IsOptional()
    @IsEnum(EmployeeRole, { message: 'Invalid role, expected "admin" | "manager" | "employee"' })
    role: EmployeeRole

    @Transform(({ value }) => +value)
    @IsOptional()
    @IsInt({ message: 'page must be an integer' })
    page: number = 1

    @Transform(({ value }) => +value)
    @IsOptional()
    @IsInt({ message: 'limit must be an integer' })
    limit: number = 10
}