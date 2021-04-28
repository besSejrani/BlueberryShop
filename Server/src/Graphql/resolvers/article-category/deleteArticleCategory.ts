// GraphQL
import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";

// Middleware
import { authentication } from "@Middleware/authentication";
import authorization from "@Middleware/authorization";

// Database
import { ArticleCategoryModel } from "@Model/ArticleCategory";

// =================================================================================================

@Resolver()
export class DeleteArticleCategoryResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(authentication)
  @UseMiddleware(authorization(["admin"]))
  async deleteArticleCategory(@Arg("articleCategoryId") articleCategoryId: string): Promise<boolean> {
    const emailNewsletter = await ArticleCategoryModel.findById(articleCategoryId);

    if (!emailNewsletter) {
      return true;
    }

    await ArticleCategoryModel.findOneAndDelete({ _id: articleCategoryId });

    return true;
  }
}
