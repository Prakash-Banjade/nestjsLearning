import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class PayloadUser {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEnum(['ADMIN', 'MANAGER', 'EMPLOYEE'])
    @IsNotEmpty()
    role: 'ADMIN' | 'MANAGER' | 'EMPLOYEE';
}