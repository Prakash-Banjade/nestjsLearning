import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Roles } from 'src/types/globals.types';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => Roles, { defaultValue: Roles.USER, description: 'User role, (admin, moderator, user)' })
  role: Roles;

  @Field(() => String, { nullable: true })
  image: string;

  @Field(() => Boolean, { defaultValue: false })
  isDonor: boolean;
}
