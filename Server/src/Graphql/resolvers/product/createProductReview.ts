// GraphQL
import { Resolver, Mutation, Arg } from "type-graphql";
import { CreateReviewInput } from "./inputs/productReviewInput";

// Database
import { Product, ProductModel } from "../../../Model/Product";

// ========================================================================================================

@Resolver()
export class CreateReviewResolver {
  @Mutation(() => Product, { nullable: true })
  async createProductReview(
    @Arg("productId") productId: string,
    @Arg("reviewInput") reviewInput: CreateReviewInput
  ): Promise<Product | undefined | boolean> {
    const product = await ProductModel.findById(productId);

    if (!product) {
      return true;
    }

    return await ProductModel.findOneAndUpdate(
      { _id: product._id },
      {
        $push: {
          reviews: { reviewerName: reviewInput.username, rating: +reviewInput.rating, review: reviewInput.review },
        },
      },
      { upsert: true, new: true }
    );
  }
}
