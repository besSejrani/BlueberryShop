// GraphQL
import { Resolver, Mutation, Arg } from "type-graphql";
import { CreateReviewInput } from "./types/productReviewInput";

// Database
import { Product, ProductModel } from "../../../Model/Product";

// ========================================================================================================

@Resolver()
export class CreateReviewResolver {
  @Mutation(() => Boolean)
  async createProductReview(
    @Arg("productId") productId: string,
    @Arg("reviewInput") reviewInput: CreateReviewInput
  ): Promise<Product | null | boolean> {
    const product = await ProductModel.findById(productId);

    if (!product) {
      return true;
    }

    await ProductModel.findOneAndUpdate(
      { _id: product._id },
      {
        $push: {
          reviews: { reviewerName: reviewInput.username, rating: +reviewInput.rating, review: reviewInput.review },
        },
      },
      { upsert: true }
    );

    return true;
  }
}
