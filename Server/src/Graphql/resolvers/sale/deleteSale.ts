// GraphQL
import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";

// Middleware
import { authentication } from "../../../Middleware/authentication";
import authorization from "../../../Middleware/authorization";

// Database
import { SaleModel } from "../../../Model/Sale";

// ========================================================================================================

@Resolver()
export class DeleteSaleResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(authentication)
  @UseMiddleware(authorization(["admin"]))
  async deleteSale(@Arg("productId") productId: string): Promise<boolean> {
    const sale = await SaleModel.findById(productId);

    if (!sale) {
      return true;
    }

    await SaleModel.findOneAndDelete({ _id: productId });

    return true;
  }
}
