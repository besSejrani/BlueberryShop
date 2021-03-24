import { InputType, Field } from "type-graphql";

@InputType()
export class SigninInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
