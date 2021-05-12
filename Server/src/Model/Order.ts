// Database
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

// SubDocuments
import { Billing } from "./user/Billing";
import { Shipping } from "./user/Shipping";

// GraphQL
import { Field, ObjectType } from "type-graphql";

// ========================================================================================================

@ObjectType()
export class Order {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property()
  fullName?: string;

  @Field()
  @Property()
  amount?: number;

  @Field(() => Billing)
  @Property()
  billing?: Billing;

  @Field(() => Shipping)
  @Property()
  shipping?: Shipping;

  @Field()
  @Property({ default: Date.now() })
  createdAt?: Date;
}

export const OrderModel = getModelForClass(Order);
