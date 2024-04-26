import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {

  @Field(() => Int, { description: 'Primary key' })
  id: number;

  @Field(() => String, { description: 'User name' })
  name: string;

  @Field(() => String)
  email: string;
}
