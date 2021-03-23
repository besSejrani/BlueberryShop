// GraphQL
import { Field, ObjectType } from "type-graphql";

// Database
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
// import { Ref } from "../Graphql/types/Ref";

// import { Product } from "./Product";

// ========================================================================================================

@ObjectType()
export class Review {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  reviewerName: string;

  @Field()
  @Property({ required: true })
  rating: number;

  @Field()
  @Property({ required: true })
  review: string;

  //   @Property({ ref: "Product", required: true })
  //   user: Ref<Product>;
}

// ========================================================================================================

export const ReviewModel = getModelForClass(Review);
