// GraphQL
import { Mutation, Resolver, Ctx } from "type-graphql";
import { MyContext } from "@Graphql/types/MyContext";

// =================================================================================================

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() context: MyContext): Promise<boolean> {
    context.res.clearCookie("token");

    return true;
  }
}
