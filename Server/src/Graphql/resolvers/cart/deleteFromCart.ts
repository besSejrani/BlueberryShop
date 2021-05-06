// GraphQL
import { Resolver, Mutation, Ctx, UseMiddleware, Arg } from "type-graphql";
import { MyContext } from "src/Graphql/types/MyContext";

// Database
import { UserModel } from "@Model/user/User";

// Middleware
import { authentication } from "@Middleware/authentication";

// =================================================================================================

@Resolver()
export class deleteProductFromCart {
  @Mutation(() => Boolean)
  @UseMiddleware(authentication)
  async deleteProductFromCart(@Arg("productId") productId: string, @Ctx() context: MyContext): Promise<boolean> {
    if (!context.req.userId) {
      return true;
    }

    await UserModel.findOneAndUpdate(
      { _id: context.req.userId },
      {
        $pull: {
          // @ts-ignore
          cart: productId,
        },
      },
      { new: true, upsert: true },
    );

    return true;
  }
}
