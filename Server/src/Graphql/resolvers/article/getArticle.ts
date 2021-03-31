// GraphQL
import { Resolver, Query, Arg } from "type-graphql";
import { GetArticleInput } from "./inputs/getArticleInput";

// Database
import { Article, ArticleModel } from "../../../Model/Article";

//=======================================================================

@Resolver()
export class GetArticleResolver {
  @Query(() => Article, { nullable: true })
  async getArticle(@Arg("articleInput") { articleId = "", slug = "" }: GetArticleInput): Promise<Article | null> {
    const result = slug;

    return result ? await ArticleModel.findOne({ slug: slug }) : await ArticleModel.findOne({ _id: articleId });
  }
}
