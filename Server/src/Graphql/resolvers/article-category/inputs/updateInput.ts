import { InputType, Field } from "type-graphql";

// ========================================================================================================

@InputType()
export class UpdateArticleCategoryInput {
  @Field({ nullable: true })
  articleCategoryId?: string;

  @Field({ nullable: true })
  name?: string;
}
