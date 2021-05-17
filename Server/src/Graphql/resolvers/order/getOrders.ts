// GraphQL
import { Resolver, Query, Ctx, UseMiddleware } from "type-graphql";
import { MyContext } from "src/Graphql/types/MyContext";

// Database
import { Order, OrderModel } from "@Model/Order";

// Middleware
import { authentication } from "@Middleware/authentication";

// =================================================================================================

@Resolver()
export class GetOrderResolver {
  @Query(() => [Order], { nullable: true })
  @UseMiddleware(authentication)
  async getOrders(@Ctx() context: MyContext): Promise<Order[] | null> {
    if (!context.req.userId) {
      return null;
    }

    const cart = await OrderModel.find().populate({
      path: "cart",
    });

    return cart;
  }
}
