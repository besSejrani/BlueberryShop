// Class-Validator
import { IsEmail, MinLength } from "class-validator";

// GraphQL
import { InputType, Field } from "type-graphql";

// =================================================================================================

@InputType()
export class SignupInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  username: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8, { message: "Password must have a minimum length of 8" })
  password: string;
}
