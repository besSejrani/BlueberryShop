// GraphQL
import { Resolver, Query, UseMiddleware, Ctx } from "type-graphql";
import { MyContext } from "../../types/MyContext";

// Database
import { PartialUser } from "./types/PartialUser";
import { User, UserModel } from "../../../Model/User";

// Middleware
import { authentication } from "../../../Middleware/authentication";

//=======================================================================

@Resolver()
export class GetCurrentUserResolver {
  @Query(() => PartialUser, { nullable: true })
  @UseMiddleware(authentication)
  async getCurrentUser(@Ctx() context: MyContext): Promise<Partial<User> | null> {
    if (!context.req.userId) {
      return null;
    }

    const user = await UserModel.findById(context.req.userId);

    return { username: user?.username, _id: user?._id, role: user?.role };
  }
}
