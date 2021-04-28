// GraphQL
import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";

// Middleware
import { authentication } from "@Middleware/authentication";
import authorization from "@Middleware/authorization";

// Database
import { ArticleCategoryModel } from "@Model/ArticleCategory";

// =================================================================================================

@Resolver()
export class CreateArticleCategoryResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(authentication)
  @UseMiddleware(authorization(["admin"]))
  async createArticleCategory(@Arg("articleCategoryName") articleCategoryName: string): Promise<boolean> {
    const categoryArticle = await ArticleCategoryModel.findOne({ name: articleCategoryName });

    if (categoryArticle) {
      return true;
    }

    const newCategoryArticle = new ArticleCategoryModel({ name: articleCategoryName });
    newCategoryArticle.save();

    return true;
  }
}
