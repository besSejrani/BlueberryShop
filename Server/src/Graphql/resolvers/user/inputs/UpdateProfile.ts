// Class-Validator
import { IsEmail, MaxLength } from "class-validator";

// GraphQL
import { InputType, Field } from "type-graphql";

// ========================================================================================================

@InputType()
export class UpdateProfile {
  @Field()
  @MaxLength(20, { message: "User firstname information can not be longer than 20 characters" })
  firstName?: string;

  @Field()
  @MaxLength(25, { message: "User lastname can not be longer than 30 characters" })
  lastName?: string;

  @Field()
  @MaxLength(20, { message: "Username can not be longer than 20 characters" })
  username?: string;

  @Field()
  @IsEmail()
  @MaxLength(25, { message: "Email can not be longer than 25 characters" })
  email?: string;
}
