// GraphQL
import { Resolver, Query, Arg } from "type-graphql";

// Database
import { Article, ArticleModel } from "../../../Model/Article";

//=======================================================================

@Resolver()
export class GetArticleResolver {
  @Query(() => Article, { nullable: true })
  async getArticle(
      @Arg("productSlug") productSlug:string
  ): Promise<Article | null> {
    return await ArticleModel.findOne ({slug:productSlug});
  }
}
