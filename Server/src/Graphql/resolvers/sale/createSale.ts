// GraphQL
import { Resolver, Mutation, Arg } from "type-graphql";
import { CreateSaleInput } from "./inputs/saleInput";

// Database
import { SaleModel } from "../../../Model/Sale";

// ========================================================================================================

@Resolver()
export class CreateSaleResolver {
  @Mutation(() => Boolean)
  async createSale(@Arg("saleInput") saleInput: CreateSaleInput): Promise<boolean> {
    const category = await SaleModel.findOne({ _id: saleInput.productId });

    if (category) {
      return true;
    }

    console.log(saleInput)

    const newCategory = new SaleModel({
      sale: saleInput.sale,
      startDate: saleInput.startDate,
      endDate: saleInput.endDate,
      discount: saleInput.discount,
      products: saleInput.productId,
    });
    newCategory.save();

    return true;
  }
}
