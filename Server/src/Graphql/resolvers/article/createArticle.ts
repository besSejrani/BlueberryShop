// GraphQL
import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";
import { CreateArticleInput } from "./inputs/createArticleInput";

//Authorization
import { authentication } from "../../../Middleware/authentication";
import authorization from "../../../Middleware/authorization";

// Database
import { ArticleModel } from "../../../Model/Article";

// ========================================================================================================

@Resolver()
export class CreateArticleResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(authentication)
  @UseMiddleware(authorization(["admin"]))
  async createArticle(
    @Arg("input")
    { author, categories, content, publishedAt, slug, status, summary, title }: CreateArticleInput
  ): Promise<boolean> {
    const article = await ArticleModel.findOne({ title });

    if (article) {
      return true;
    }

    const newArticle = new ArticleModel({ author, categories, content, publishedAt, slug, status, summary, title });
    newArticle.save();

    return true;
  }
}
