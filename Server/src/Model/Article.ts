// GraphQL
import { Field, ObjectType } from "type-graphql";

// Database
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

// ========================================================================================================

@ObjectType()
export class Article {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  author: string;

  @Field()
  @Property({ required: true })
  title: string;

  @Field()
  @Property({ required: true })
  slug: string;

  @Field()
  @Property({ required: true })
  summary: string;

  @Field()
  @Property({ required: true })
  publishedAt: Date;

  @Field()
  @Property({ required: true })
  category: string;

  @Field()
  @Property({ required: true })
  content: string;

  @Field()
  @Property({ enum: ["DRAFT", "PUBLISHED", "ARCHIVED"], default: false })
  status: string;

  @Field()
  @Property({ required: true, default: Date.now() })
  createdAt: Date;
}

// ========================================================================================================

export const ArticleModel = getModelForClass(Article);
