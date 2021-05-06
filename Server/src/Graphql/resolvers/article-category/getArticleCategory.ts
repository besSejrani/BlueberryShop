// GraphQL
import { Resolver, Query, Arg } from "type-graphql";

// Database
import { ArticleCategory, ArticleCategoryModel } from "@Model/ArticleCategory";

// =================================================================================================

@Resolver()
export class GetArticleCategoryResolver {
  @Query(() => ArticleCategory, { nullable: true })
  async getArticleCategory(@Arg("articleCategoryId") articleCategoryId: string): Promise<ArticleCategory | null> {
    const articleCategory = await ArticleCategoryModel.findById({ _id: articleCategoryId });
    return articleCategory;
  }
}
