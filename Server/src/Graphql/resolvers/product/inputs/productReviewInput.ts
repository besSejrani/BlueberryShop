// Class-Validator
import { MaxLength, IsInt } from "class-validator";

// GraphQL
import { InputType, Field } from "type-graphql";

// ========================================================================================================

@InputType()
export class CreateReviewInput {
  @Field()
  @IsInt()
  rating: string;

  @Field()
  @MaxLength(250, { message: "Product name can not be longer than 250 characters" })
  review: string;
}
