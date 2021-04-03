// GraphQL
import { Field, ObjectType } from "type-graphql";

// Database
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

// ========================================================================================================

@ObjectType()
export class ArticleCategory {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  name: string;
}

// ========================================================================================================

export const ArticleCategoryModel = getModelForClass(ArticleCategory);
