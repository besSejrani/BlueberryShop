// GraphQL
import { Resolver, Query } from "type-graphql";
import { ProductPagination } from "./types/productPaginationType";

// Database
import { Product, ProductModel } from "../../../Model/Product";

// ========================================================================================================

interface ProductPaginationInterface {
  products: Product[] | null;
  count: number;
}

@Resolver()
export class GetProductsResolver {
  @Query(() => ProductPagination, { nullable: true })
  async getProducts(): Promise<ProductPaginationInterface> {
    const count = await ProductModel.countDocuments();

    const products = await ProductModel.find({}).populate("categories");

    return { products, count };
  }
}
