// GraphQL
import { Resolver, Mutation, Arg } from "type-graphql";
import { CreateSaleInput } from "./inputs/saleInput";

// Database
import { SaleModel } from "../../../Model/Sale";

// ========================================================================================================

@Resolver()
export class CreateSaleResolver {
  @Mutation(() => Boolean)
  async createSale(@Arg("saleInput") categoryInput: CreateSaleInput): Promise<boolean> {
    const category = await SaleModel.findOne({ _id: categoryInput.productId });

    if (category) {
      return true;
    }

    const newCategory = new SaleModel({
      sale: categoryInput.sale,
      startDate: categoryInput.startDate,
      endDate: categoryInput.endDate,
      products: categoryInput.productId,
    });
    newCategory.save();

    return true;
  }
}
