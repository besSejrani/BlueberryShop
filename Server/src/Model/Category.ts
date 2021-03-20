// GraphQL
import { Field, ObjectType } from "type-graphql";

// Database
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

// ========================================================================================================

@ObjectType()
export class Category {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  name: string;
}

// ========================================================================================================

export const CategoryModel = getModelForClass(Category);
