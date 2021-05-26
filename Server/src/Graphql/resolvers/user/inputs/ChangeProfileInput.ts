// Class-Validator
import { IsEmail } from "class-validator";

// GraphQL
import { InputType, Field } from "type-graphql";

// ========================================================================================================

@InputType()
export class ChangedProfileInput {
  @Field()
  username: string;

  @Field()
  @IsEmail()
  email: string;
}
