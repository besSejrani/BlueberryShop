// GraphQL
import { Resolver, Query } from "type-graphql";

// Database
import { Category, CategoryModel } from "@Model/Category";

// =================================================================================================

@Resolver()
export class GetCategoriesResolver {
  @Query(() => [Category], { nullable: true })
  async getCategories(): Promise<Category[] | null> {
    const productCategories = await CategoryModel.find({});

    return productCategories;
  }
}
