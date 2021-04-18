// GraphQL
import { Resolver, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";
import { MyContext } from "src/Graphql/types/MyContext";

// Database
import { UserModel } from "../../../Model/user/User";
import { ProductModel } from "../../../Model/Product";

// Middleware
import { authentication } from "../../../Middleware/authentication";

// ========================================================================================================

@Resolver()
export class AddToCartResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(authentication)
  async addToCart(@Arg("productId") productId: string, @Ctx() context: MyContext): Promise<boolean> {
    const product = ProductModel.findOne({ _id: productId });

    if (!product) {
      return true;
    }

    const user = await UserModel.findOne({ _id: context.req.userId });

    if (!user) {
      return true;
    }

    // await UserModel.findOneAndUpdate(
    //   { _id: context.req.userId },
    //   {
    //     $addToSet: {

    //       cart: productId.to

    //       // cart: productId,
    //     },
    //   },
    //   { new: true, upsert: true }
    // );

    return true;
  }
}
