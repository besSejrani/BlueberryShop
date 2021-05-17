import { InputType, Field } from "type-graphql";

@InputType()
export class SignupInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
