// GraphQL
import { Resolver, Mutation, Arg } from "type-graphql";
import { CreateReviewInput } from "./types/productReviewInput";

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

// // GraphQL
// import { Resolver, Mutation, Arg } from "type-graphql";
// import { CreateReviewInput } from "./types/productReviewInput";

// // Database
// import { ProductModel } from "../../../Model/Product";
// import { Review } from "../../../Model/Review";

// // ========================================================================================================

// @Resolver()
// export class CreateReviewResolver {
//   @Mutation(() => Review, { nullable: true })
//   async createProductReview(
//     @Arg("productId") productId: string,
//     @Arg("reviewInput") reviewInput: CreateReviewInput
//   ): Promise<Review | undefined | boolean> {
//     const product = await ProductModel.findById(productId);

//     if (!product) {
//       return true;
//     }

//     const reviews = await ProductModel.findOneAndUpdate(
//       { _id: product._id },
//       {
//         $push: {
//           reviews: { reviewerName: reviewInput.username, rating: +reviewInput.rating, review: reviewInput.review },
//         },
//       },
//       { upsert: true, new: true }
//     );

//     const review = reviews?.reviews?.find(
//       (review) =>
//         review.rating === +reviewInput.rating &&
//         review.review === reviewInput.review &&
//         review.reviewerName === reviewInput.username
//     );

//     return review;
//   }
// }
