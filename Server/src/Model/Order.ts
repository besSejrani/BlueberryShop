// Database
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

// SubDocuments
import { Billing } from "./user/Billing";
import { Shipping } from "./user/Shipping";
import { Product } from "@Model/Product";

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

  @Field(() => [Product])
  @Property({ ref: Product, type: ObjectId })
  cart?: Product[];

  @Field(() => Billing)
  @Property()
  billing?: Billing;

  @Field(() => Shipping)
  @Property()
  shipping?: Shipping;

  @Field()
  @Property()
  orderNumber: string;

  @Field()
  @Property()
  invoiceNumber: string;

  @Field()
  @Property({ default: Date.now() })
  createdAt?: Date;
}

// ========================================================================================================

export const OrderModel = getModelForClass(Order);
