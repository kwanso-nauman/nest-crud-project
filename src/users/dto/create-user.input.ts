import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  email: string

  @Field()
  firstName: string

  @Field({nullable:true})
  lastName?: string

  @Field()
  phoneNumber: string

  @Field({nullable:true})
  address?: string

}
