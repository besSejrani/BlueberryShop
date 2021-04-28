// GraphQL
import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";

// Middleware
import { authentication } from "@Middleware/authentication";
import authorization from "@Middleware/authorization";

// Database
import { CategoryModel } from "@Model/Category";

// =================================================================================================

@Resolver()
export class DeleteCategoryResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(authentication)
  @UseMiddleware(authorization(["admin"]))
  async deleteCategory(@Arg("categoryId") categoryId: string): Promise<boolean> {
    const emailNewsletter = await CategoryModel.findById(categoryId);

    if (!emailNewsletter) {
      return true;
    }

    await CategoryModel.findOneAndDelete({ _id: categoryId });

    return true;
  }
}
