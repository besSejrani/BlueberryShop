// GraphQL
import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";

// Middleware
import { authentication } from "@Middleware/authentication";
import authorization from "@Middleware/authorization";

// Database
import { CategoryModel } from "@Model/Category";

// =================================================================================================

@Resolver()
export class CreateCategoryResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(authentication)
  @UseMiddleware(authorization(["admin"]))
  async createCategory(@Arg("category") categoryInput: string): Promise<boolean> {
    const category = await CategoryModel.findOne({ name: categoryInput });

    if (category) {
      return true;
    }

    const newCategory = new CategoryModel({ name: categoryInput });
    newCategory.save();

    return true;
  }
}
