//GraphQL
import { InputType, Field } from "type-graphql";

// ========================================================================================================

@InputType()
export class CreateReviewInput {
  @Field()
  username: string;

  @Field()
  rating: string;

  @Field()
  review: string;
}
