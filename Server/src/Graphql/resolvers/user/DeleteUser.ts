// GraphQL
import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";

// Middleware
import { authentication } from "@Middleware/authentication";
import authorization from "@Middleware/authorization";

// Database
import { UserModel } from "@Model/user/User";

// =================================================================================================

@Resolver()
export class DeleteUsertResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(authentication)
  @UseMiddleware(authorization(["admin"]))
  async deleteUser(@Arg("userId") userId: string): Promise<boolean> {
    await UserModel.findOneAndRemove({ _id: userId });

    return true;
  }
}
