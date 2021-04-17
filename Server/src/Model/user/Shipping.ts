// Database
import { prop as Property, getModelForClass } from "@typegoose/typegoose";

// GraphQL
import { Field, ObjectType } from "type-graphql";

// ========================================================================================================

@ObjectType()
export class Shipping {
  @Field({ nullable: true })
  @Property()
  country?: string;

  @Field({ nullable: true })
  @Property()
  address?: string;

  @Field({ nullable: true })
  @Property()
  city?: string;

  @Field({ nullable: true })
  @Property()
  zip?: number;
}

// ========================================================================================================

export const ShippingModel = getModelForClass(Shipping);
