import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SignupResponse {
  @Field()
  firstName: string

  @Field()
  email: string
}