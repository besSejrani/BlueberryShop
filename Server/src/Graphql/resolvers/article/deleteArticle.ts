// GraphQL
import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";

// Middleware
import { authentication } from "../../../Middleware/authentication";
import authorization from "../../../Middleware/authorization";

// Database
import { ArticleModel } from "../../../Model/Article";

// ========================================================================================================

@Resolver()
export class DeleteArticleResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(authentication)
  @UseMiddleware(authorization(["admin"]))
  async deleteArticle(@Arg("articleId") articleId: string): Promise<boolean> {
    const emailNewsletter = await ArticleModel.findById(articleId);

    if (!emailNewsletter) {
      return true;
    }

    await ArticleModel.findOneAndDelete({ _id: articleId });

    return true;
  }
}
