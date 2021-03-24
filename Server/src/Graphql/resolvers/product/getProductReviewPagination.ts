// GraphQL
import { Resolver, Query, Arg } from "type-graphql";
import { ProductPaginationInput } from "./types/productsPaginationInput";
import { ProductReviewPagination } from "./types/productReviewPaginationType";

// Database
import { ProductModel } from "../../../Model/Product";
import { ObjectId } from "mongodb";

// ========================================================================================================

@Resolver()
export class GetProductReviewPaginationResolver {
  @Query(() => ProductReviewPagination, { nullable: true })
  async getProductReviewPagination(
    @Arg("productId") productId: string,
    @Arg("pagination") { pageNumber = 1, pageSize = 10 }: ProductPaginationInput
  ): Promise<ProductReviewPagination> {
    // 12*(2-1)=12
    const skips = pageSize * (pageNumber - 1);

    const reviews = (await ProductModel.aggregate([
      { $unwind: "$reviews" },
      {
        $match: {
          _id: { $eq: new ObjectId(productId) },
        },
      },
      {
        $project: {
          _id: 1,
          categories: 0,
          productImages: 0,
          status: 0,
          options: 0,
          promotion: 0,
          createdAt: 0,
          name: 0,
          price: 0,
          description: 0,
          stock: 0,
          productImageUrl: 0,
          __v: 0,
        },
      },

      {
        $skip: skips,
      },
      {
        $limit: pageSize,
      },
      {
        $group: {
          _id: null,
          reviews: {
            $push: {
              reviews: "$reviews",
            },
          },
        },
      },
    ]).exec()) as object[];

    const reviewCount = await ProductModel.aggregate([
      { $unwind: "$reviews" },
      {
        $match: {
          _id: { $eq: new ObjectId(productId) },
        },
      },
      {
        $project: {
          _id: 0,
          categories: 0,
          productImages: 0,
          status: 0,
          options: 0,
          promotion: 0,
          createdAt: 0,
          name: 0,
          price: 0,
          description: 0,
          stock: 0,
          productImageUrl: 0,
          __v: 0,
        },
      },

      { $group: { _id: null, count: { $sum: 1 } } },
    ]).exec();

    const count = reviewCount[0].count as number;

    return { reviews, count };
  }
}
