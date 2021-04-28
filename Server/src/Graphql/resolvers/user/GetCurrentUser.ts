// GraphQL
import { Resolver, Query, UseMiddleware, Ctx } from "type-graphql";
import { MyContext } from "../../types/MyContext";

// Database
import { User, UserModel } from "@Model/user/User";

// Middleware
import { authentication } from "@Middleware/authentication";

// =================================================================================================

@Resolver()
export class GetCurrentUserResolver {
  @Query(() => User, { nullable: true })
  @UseMiddleware(authentication)
  async getCurrentUser(@Ctx() context: MyContext): Promise<User | null> {
    if (!context.req.userId) {
      return null;
    }

    const user = await UserModel.findById(context.req.userId);

    return user;
  }
}
