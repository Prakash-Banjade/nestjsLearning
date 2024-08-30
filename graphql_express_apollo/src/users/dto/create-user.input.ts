import { Field, Int, InputType } from '@nestjs/graphql';
import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
