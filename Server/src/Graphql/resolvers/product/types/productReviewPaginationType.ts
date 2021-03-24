import { Field, ObjectType } from "type-graphql";

// Database
import { ObjectId } from "mongodb";
// ========================================================================================================

@ObjectType()
export class ProductReviewPagination {
  @Field()
  readonly _id: ObjectId;

  @Field(() => Reviews, { nullable: true })
  reviews: string[];
}

@ObjectType()
export class Reviews {
  @Field({ nullable: true })
  reviewerName: string;

  @Field({ nullable: true })
  rating: string;

  @Field({ nullable: true })
  review: string;
}
