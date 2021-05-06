// GraphQL
import { Resolver, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";
import { CreateReviewInput } from "./inputs/productReviewInput";
import { MyContext } from "../../types/MyContext";

// Database
import { Product, ProductModel } from "@Model/Product";
import { UserModel } from "@Model/user/User";

// Middleware
import { authentication } from "@Middleware/authentication";

// =================================================================================================

@Resolver()
export class CreateReviewResolver {
  @Mutation(() => Product)
  @UseMiddleware(authentication)
  async createProductReview(
    @Arg("productId") productId: string,
    @Arg("reviewInput") reviewInput: CreateReviewInput,
    @Ctx() context: MyContext,
  ): Promise<Product | undefined | boolean> {
    const user = await UserModel.findOne({ _id: context.req.userId });

    if (!user) {
      return true;
    }

    const productReviews = await ProductModel.findOneAndUpdate(
      { _id: productId },
      {
        $push: {
          reviews: { reviewerName: user.username, rating: +reviewInput.rating, review: reviewInput.review },
        },
      },
      { new: true, upsert: true },
    );

    return productReviews;
  }
}
