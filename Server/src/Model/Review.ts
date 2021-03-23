// GraphQL
import { Field, ObjectType } from "type-graphql";

// Database
import { prop as Property, getModelForClass } from "@typegoose/typegoose";

// ========================================================================================================

@ObjectType()
export class Review {
  @Field({ nullable: true })
  @Property({ required: true })
  reviewerName: string;

  @Field({ nullable: true })
  @Property({ required: true })
  rating: number;

  @Field({ nullable: true })
  @Property({ required: true })
  review: string;
}

// ========================================================================================================

export const ReviewModel = getModelForClass(Review);
