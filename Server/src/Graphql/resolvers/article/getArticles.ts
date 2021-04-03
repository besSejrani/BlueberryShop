// GraphQL
import { Resolver, Query } from "type-graphql";

// Database
import { Article, ArticleModel } from "../../../Model/Article";

//=======================================================================

@Resolver()
export class GetArticlesResolver {
  @Query(() => [Article], { nullable: true })
  async getArticles(): Promise<Article[] | null> {
    return await ArticleModel.find({}).populate("categories");
  }
}
