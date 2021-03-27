// GraphQL
import { Resolver, Query, Arg } from "type-graphql";

// Database
import { Sale, SaleModel } from "../../../Model/Sale";

// ========================================================================================================

@Resolver()
export class GetSaleResolver {
  @Query(() => Sale, { nullable: true })
  async getSale(@Arg("productId") productId: string): Promise<Sale | null> {
    return await SaleModel.findOne({ _id: productId }).populate("products");
  }
}
