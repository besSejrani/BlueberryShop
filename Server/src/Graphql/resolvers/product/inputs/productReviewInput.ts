//GraphQL
import { InputType, Field } from "type-graphql";

// ========================================================================================================

@InputType()
export class CreateReviewInput {
  @Field()
  rating: string;

  @Field()
  review: string;
}
