// GraphQL
import { Resolver, Mutation, Arg } from "type-graphql";

// Database
import { UserModel } from "@Model/user/User";

// Redis
import { redis } from "../../../Redis/index";
import { confirmUserPrefix } from "../../../Redis/redisPrefixe";

// =================================================================================================

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => Boolean)
  async confirmUser(@Arg("token") token: string): Promise<boolean> {
    const userId = await redis.get(confirmUserPrefix + token);

    if (!userId) {
      return false;
    }

    await UserModel.findByIdAndUpdate(userId, { confirmed: true }, { new: true });

    await redis.del(confirmUserPrefix + token);

    return true;
  }
}
