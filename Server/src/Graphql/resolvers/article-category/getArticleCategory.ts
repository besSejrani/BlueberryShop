// GraphQL
import { Resolver, Query, Arg } from "type-graphql";

// Database
import { ArticleCategory, ArticleCategoryModel } from "@Model/ArticleCategory";

// =================================================================================================

@Resolver()
export class GetArticleCategoryResolver {
  @Query(() => ArticleCategory, { nullable: true })
  async getArticleCategory(@Arg("articleCategoryId") articleCategoryId: string): Promise<ArticleCategory | null> {
    return await ArticleCategoryModel.findById({ _id: articleCategoryId });
  }
}
