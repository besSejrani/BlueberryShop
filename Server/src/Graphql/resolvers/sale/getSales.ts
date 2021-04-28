// GraphQL
import { Resolver, Query } from "type-graphql";

// Database
import { Sale, SaleModel } from "@Model/Sale";

// =================================================================================================

@Resolver()
export class GetSalesResolver {
  @Query(() => [Sale], { nullable: true })
  async getSales(): Promise<Sale[] | null> {
    const sales = await SaleModel.find({}).populate("products");

    return sales;
  }
}
