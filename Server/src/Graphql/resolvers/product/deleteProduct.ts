// GraphQL
import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";

// Middleware
import { authentication } from "../../../Middleware/authentication";
import authorization from "../../../Middleware/authorization";

// Database
import { ProductModel } from "../../../Model/Product";

// ========================================================================================================

@Resolver()
export class DeleteProductResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(authentication)
  @UseMiddleware(authorization(["admin"]))
  async deleteProduct(@Arg("productId") productId: string): Promise<boolean> {
    await ProductModel.findOneAndRemove({ _id: productId });

    return true;
  }
}
