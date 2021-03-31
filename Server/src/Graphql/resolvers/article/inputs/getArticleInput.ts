// GraphQL
import { InputType, Field } from "type-graphql";

// ========================================================================================================

@InputType()
export class GetArticleInput {
  @Field({ nullable: true })
  articleId?: string;

  @Field({ nullable: true })
  slug?: string;
}
