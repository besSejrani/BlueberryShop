// GraphQL
import { Resolver, Query, Arg } from "type-graphql";

// Database
import { Product, ProductModel } from "@Model/Product";

// =================================================================================================

@Resolver()
export class GetProductsResolver {
  @Query(() => Product, { nullable: true })
  async getProduct(@Arg("productId") productId: string): Promise<Product | null> {
    const product = await ProductModel.findOne({ _id: productId });

    return product;
  }
}
