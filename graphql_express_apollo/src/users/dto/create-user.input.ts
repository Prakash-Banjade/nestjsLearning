import { Field, Int, InputType } from '@nestjs/graphql';
import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {

  @IsInt()
  @Field(() => Int, { description: 'Primary key' })
  id: number;

  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'User name' })
  name: string;

  @IsEmail()
  @Field(() => String)
  email: string;
}
