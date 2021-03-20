// GraphQL
import { Resolver, Mutation, Arg } from "type-graphql";

// Database
import { CategoryModel } from "../../../Model/Category";

// ========================================================================================================

@Resolver()
export class CreateCategoryResolver {
  @Mutation(() => Boolean)
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
