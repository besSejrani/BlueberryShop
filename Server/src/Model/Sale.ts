// GraphQL
import { Field, ObjectType } from "type-graphql";

// Database
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Category } from "./Category";
import { Product } from "./Product";

// ========================================================================================================

@ObjectType()
export class Sale {
  @Field()
  readonly _id: ObjectId;

  @Field(() => [Product])
  @Property({ ref: Product, type: ObjectId })
  products?: Product[];

  @Field(() => [Category])
  @Property({ ref: Category, type: ObjectId })
  categories?: Category[];

  @Field()
  @Property({ required: true })
  sale: string;

  @Field()
  @Property({ required: true })
  startDate: Date;

  @Field()
  @Property({ required: true })
  endDate: Date;

  @Field()
  @Property({ required: true })
  discount: number;

  @Field()
  @Property({ default: () => Date.now() })
  createdAt?: Date;
}

// ========================================================================================================

export const SaleModel = getModelForClass(Sale);
