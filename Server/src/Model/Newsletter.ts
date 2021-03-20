// GraphQL
import { Field, ObjectType } from "type-graphql";

// Database
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

// ========================================================================================================

@ObjectType()
export class Newsletter {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({
    required: [true, "Please provide a valid email"],
    unique: true,
    trim: true,
  })
  email: string;
}

// ========================================================================================================

export const NewsletterModel = getModelForClass(Newsletter);
