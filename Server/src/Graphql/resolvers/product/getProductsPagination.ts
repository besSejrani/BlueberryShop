// GraphQL
import { Resolver, Query, Arg } from "type-graphql";
import { ProductPaginationInput } from "./inputs/productsPaginationInput";
import { ProductPagination } from "./types/productPaginationType";

// Database
import { Product, ProductModel } from "@Model/Product";

// =================================================================================================

interface ProductPaginationInterface {
  products: Product[] | null;
  count: number;
}

@Resolver()
export class GetProductsPaginationResolver {
  @Query(() => ProductPagination, { nullable: true })
  async getProductsPagination(
    @Arg("pagination") { pageNumber = 1, pageSize = 12 }: ProductPaginationInput
  ): Promise<ProductPaginationInterface> {
    const count = await ProductModel.countDocuments();

    // 12*(2-1)=12
    const skips = pageSize * (pageNumber - 1);
    const products = await ProductModel.find({}).skip(skips).limit(pageSize);

    return { products, count };
  }
}
