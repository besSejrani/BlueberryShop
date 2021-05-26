// Validator
import { Min } from "class-validator";

// GraphQL
import { InputType, Field } from "type-graphql";

// ========================================================================================================

@InputType()
export class ChangedPasswordInput {
  @Field()
  token: string;

  @Field()
  @Min(8, { message: "Password must have a minimum length of 8" })
  password: string;
}
