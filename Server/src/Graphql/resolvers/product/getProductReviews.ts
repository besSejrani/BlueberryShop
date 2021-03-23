// GraphQL
import { Resolver, Query, Arg } from "type-graphql";

// Database
import { Product, ProductModel } from "../../../Model/Product";

// ========================================================================================================

@Resolver()
export class GetProductReviewsResolver {
  @Query(() => Product, { nullable: true })
  async getProductReviews(@Arg("productId") productId: string): Promise<Product | null> {
    return await ProductModel.findById({ _id: productId });
  }
}
