// GraphQL
import { Resolver, Query } from "type-graphql";

// Database
import { ArticleCategory, ArticleCategoryModel } from "../../../Model/ArticleCategory";

//=======================================================================

@Resolver()
export class GetArticleCategoriesResolver {
  @Query(() => [ArticleCategory], { nullable: true })
  async getArticleCategories(): Promise<ArticleCategory[] | null> {
    return await ArticleCategoryModel.find({});
  }
}
