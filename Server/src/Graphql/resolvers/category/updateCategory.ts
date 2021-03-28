// GraphQL
import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";
import { UpdateCategoryInput } from "./inputs/updateInput";

// Middleware
import { authentication } from "../../../Middleware/authentication";
import authorization from "../../../Middleware/authorization";

// Database
import { Category, CategoryModel } from "../../../Model/Category";

// ========================================================================================================

@Resolver()
export class UpdateCategoryResolver {
  @Mutation(() => Category)
  @UseMiddleware(authentication)
  @UseMiddleware(authorization(["admin"]))
  async updateCategory(@Arg("categoryInput") categoryInput: UpdateCategoryInput): Promise<Category | null> {
    const category = await CategoryModel.findOne({ _id: categoryInput.categoryId });

    if (!category) {
      return null;
    }

    const update = await CategoryModel.findOneAndUpdate(
      { _id: categoryInput.categoryId },
      { ...category.toObject(), ...categoryInput },
      { new: true }
    );

    return update;
  }
}
