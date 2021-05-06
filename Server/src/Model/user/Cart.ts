// Database
import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Product } from "../Product";

// GraphQL
import { Field, ObjectType } from "type-graphql";

// ========================================================================================================

@ObjectType()
export class Cart {
  @Field()
  @Property({ default: 1 })
  quantity: number;

  @Field(() => [Product])
  @Property({ ref: Product, type: ObjectId })
  cart?: Product[];
}

export const CartModel = getModelForClass(Cart);
