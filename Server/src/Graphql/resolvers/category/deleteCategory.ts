// GraphQL
import { Resolver, Mutation, Arg } from "type-graphql";

// Database
import { CategoryModel } from "../../../Model/Category";

// ========================================================================================================

@Resolver()
export class DeleteCategoryResolver {
  @Mutation(() => Boolean)
  async deleteCategory(@Arg("categoryId") categoryId: string): Promise<boolean> {
    const emailNewsletter = await CategoryModel.findById(categoryId);

    if (!emailNewsletter) {
      return true;
    }

    await CategoryModel.findOneAndDelete({ _id: categoryId });

    return true;
  }
}
