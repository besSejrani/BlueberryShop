// GraphQL
import { Resolver, Mutation, Arg } from "type-graphql";
import { UpdateSaleInput } from "./inputs/updateSaleInput";

// Database
import { Sale, SaleModel } from "@Model/Sale";

// =================================================================================================

@Resolver()
export class UpdateSaleResolver {
  @Mutation(() => Sale)
  async updateSale(@Arg("updateSaleInput") updateSaleInput: UpdateSaleInput): Promise<Sale | null> {
    const sale = await SaleModel.findOne({ _id: updateSaleInput.productId });

    if (!sale) {
      return null;
    }

    const update = await SaleModel.findOneAndUpdate(
      { _id: updateSaleInput.productId },
      { ...sale.toObject(), ...updateSaleInput },
      { new: true }
    );

    return update;
  }
}
