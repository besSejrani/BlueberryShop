// Class-Validator
import { MaxLength } from "class-validator";

// GraphQL
import { InputType, Field } from "type-graphql";

// ========================================================================================================

@InputType()
export class CreateReviewInput {
  @Field()
  rating: string;

  @Field()
  @MaxLength(250, { message: "Product name can not be longer than 250 characters" })
  review: string;
}
