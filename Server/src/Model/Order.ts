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
  @Property({ required: [true, "Please provide a user name"] })
  fullName?: string;

  @Field()
  @Property({ required: true })
  amount?: number;

  @Field(() => [Product])
  @Property({ required: true, ref: Product, type: ObjectId })
  cart?: Product[];

  @Field(() => Billing)
  @Property({ required: true })
  billing?: Billing;

  @Field(() => Shipping)
  @Property({ required: true })
  shipping?: Shipping;

  @Field()
  @Property({ required: true })
  orderNumber: string;

  @Field()
  @Property()
  invoiceNumber: string;

  @Field()
  @Property({ default: () => Date.now() })
  createdAt?: Date;
}

// ========================================================================================================

export const OrderModel = getModelForClass(Order);
