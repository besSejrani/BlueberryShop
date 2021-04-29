// GraphQL
import { Resolver, Query, Arg } from "type-graphql";

// Database
import { User, UserModel } from "@Model/user/User";

// =================================================================================================

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async getUser(@Arg("userId", () => String) userId: string): Promise<User | null> {
    const user = await UserModel.findById(userId);
    return user;
  }
}
