import { Field, ID, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class BaseSchema {
  @Field((type) => ID)
  id: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;

  @Field()
  deletedAt: string;
}