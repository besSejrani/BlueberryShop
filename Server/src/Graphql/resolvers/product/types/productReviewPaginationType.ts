import { Field, ObjectType } from "type-graphql";

// Database
import { ObjectId } from "mongodb";
// ========================================================================================================

@ObjectType()
export class ProductReviewPagination {
  @Field({ nullable: true })
  count: number;

  @Field(() => [Reviews10], { nullable: true })
  reviews: object[];
}

@ObjectType()
export class Reviews10 {
  @Field({ nullable: true })
  _id: ObjectId;

  @Field(() => [Reviews30], { nullable: true })
  reviews: object[];
}

@ObjectType()
export class Reviews30 {
  @Field(() => Reviews40, { nullable: true })
  reviews: object;
}

@ObjectType()
export class Reviews40 {
  @Field({ nullable: true })
  reviewerName: string;

  @Field({ nullable: true })
  rating: string;

  @Field({ nullable: true })
  review: string;
}
