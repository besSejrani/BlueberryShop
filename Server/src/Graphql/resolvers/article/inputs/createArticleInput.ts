// GraphQL
import { InputType, Field } from "type-graphql";
import { Status } from "@Graphql/enums/statusEnum";

// ========================================================================================================

@InputType()
export class CreateArticleInput {
  @Field()
  author: string;

  @Field()
  title: string;

  @Field()
  slug: string;

  @Field()
  summary: string;

  @Field()
  publishedAt: Date;

  @Field()
  categories: string;

  @Field()
  content: string;

  @Field(() => Status)
  status: Status;
}
