// Database
import { prop as Property } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

// GraphQL
import { Field, ObjectType } from "type-graphql";

// ========================================================================================================

@ObjectType()
export class PartialUser {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({ required: [true, "Please provide a username"], unique: true, trim: true, minlength: 3, maxlength: 20 })
  username: string;

  @Field()
  @Property({ enum: ["user", "dev", "designer", "admin"], default: "user" })
  role: string;

  @Field({ nullable: true })
  @Property({ default: "" })
  profileImageUrl: string;
}
