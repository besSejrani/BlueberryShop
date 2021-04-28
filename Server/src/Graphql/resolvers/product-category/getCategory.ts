// GraphQL
import { Resolver, Query, Arg } from "type-graphql";

// Database
import { Category, CategoryModel } from "@Model/Category";

// =================================================================================================

@Resolver()
export class GetCategoryResolver {
  @Query(() => Category, { nullable: true })
  async getCategory(@Arg("categoryId") categoryId: string): Promise<Category | null> {
    return await CategoryModel.findById({ _id: categoryId });
  }
}
