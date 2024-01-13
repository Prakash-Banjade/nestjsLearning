/*
A `pipe` is a class annotated with the @Injectable() decorator, which implements the PipeTransform interface.
Pipes have two typical use cases:
1. transformation: transform input data to the desired form (e.g., from string to integer)
2. validation: evaluate input data and if valid, simply pass it through unchanged; otherwise, throw an exception
 */

import { PartialType } from '@nestjs/mapped-types'; // need to install as dev dependency
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator'; // need to install as dependency
// REF: https://github.com/typestack/class-validator#validation-decorators

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['ADMIN', 'INTERN', 'USER'], {
    message: "Not a valid role, expected 'ADMIN', 'INTERN' or 'USER'"
  })
  role: 'ADMIN' | 'INTERN' | 'USER';
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
