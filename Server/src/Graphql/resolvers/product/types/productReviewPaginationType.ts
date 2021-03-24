import { Field, ObjectType } from "type-graphql";


// ========================================================================================================

@ObjectType()
export class ProductReviewPagination {

  @Field({nullable:true})
  count: number;

  @Field(() => [Reviews10], { nullable: true })
  reviews: object[];
}

@ObjectType()
export class Reviews10 {
  @Field(() => Reviews20, { nullable: true })
  reviews: object;
}

@ObjectType()
export class Reviews20 {
  @Field({ nullable: true })
  reviewerName: string;

  @Field({ nullable: true })
  rating: string;

  @Field({ nullable: true })
  review: string;
}
