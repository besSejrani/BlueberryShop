// GraphQL
import { InputType, Field } from "type-graphql";

import { Status } from "../../../enums/statusEnum";

// ========================================================================================================

@InputType()
export class UpdateArticleInput {
  @Field({ nullable: true })
  author: string;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  slug: string;

  @Field({ nullable: true })
  summary: string;

  @Field({ nullable: true })
  publishedAt: Date;

  @Field({ nullable: true })
  categories: string;

  @Field({ nullable: true })
  content: string;

  @Field(() => Status, { nullable: true })
  status: Status;
}
