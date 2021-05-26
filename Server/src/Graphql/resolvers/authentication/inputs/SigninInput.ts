// Class-Validator
import { IsEmail } from "class-validator";

// GraphQL
import { InputType, Field } from "type-graphql";

// =================================================================================================

@InputType()
export class SigninInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}
