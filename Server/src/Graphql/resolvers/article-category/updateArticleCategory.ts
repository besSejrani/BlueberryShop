// GraphQL
import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";
import { UpdateArticleCategoryInput } from "./inputs/updateInput";

// Middleware
import { authentication } from "@Middleware/authentication";
import authorization from "@Middleware/authorization";

// Database
import { ArticleCategory, ArticleCategoryModel } from "@Model/ArticleCategory";

// =================================================================================================

@Resolver()
export class UpdateArticleCategoryResolver {
  @Mutation(() => ArticleCategory)
  @UseMiddleware(authentication)
  @UseMiddleware(authorization(["admin"]))
  async updateArticleCategory(
    @Arg("articleCategoryInput") articleCategoryInput: UpdateArticleCategoryInput,
  ): Promise<ArticleCategory | null> {
    const category = await ArticleCategoryModel.findOne({ _id: articleCategoryInput.articleCategoryId });

    if (!category) {
      return null;
    }

    const update = await ArticleCategoryModel.findOneAndUpdate(
      { _id: articleCategoryInput.articleCategoryId },
      { ...category.toObject(), ...articleCategoryInput },
      { new: true },
    );

    return update;
  }
}
