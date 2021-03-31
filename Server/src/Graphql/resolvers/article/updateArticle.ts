// GraphQL
import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";
import { UpdateArticleInput } from "./inputs/updateArticleInput";

//Authorization
import { authentication } from "../../../Middleware/authentication";
import authorization from "../../../Middleware/authorization";

// Database
import { Article, ArticleModel } from "../../../Model/Article";

// ========================================================================================================

@Resolver()
export class UpdateArticleResolver {
  @Mutation(() => Article)
  @UseMiddleware(authentication)
  @UseMiddleware(authorization(["admin"]))
  async updateArticle(
    @Arg("articleId") articleId: string,
    @Arg("articleInput")
    updateArticleInput: UpdateArticleInput
  ): Promise<Article | null> {
    const product = await ArticleModel.findOne({ _id: articleId });

    if (!product) {
      return null;
    }

    const update = await ArticleModel.findOneAndUpdate(
      { _id: articleId },
      { ...product.toObject(), ...updateArticleInput },
      { new: true }
    );

    return update;
  }
}
