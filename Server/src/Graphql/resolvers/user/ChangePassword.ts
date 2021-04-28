// GraphQL
import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { ChangedPasswordInput } from "./inputs/ChangePasswordInput";
import { MyContext } from "../../types/MyContext";

// Database
import { User, UserModel } from "@Model/user/User";

// Redis
import { redis } from "../../../Redis/index";
import { forgotPaswordPrefix } from "../../../Redis/redisPrefixe";

// Authentication
import bcrypt from "bcryptjs";

// =================================================================================================

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => User, { nullable: true })
  async changePassword(
    @Arg("input") { token, password }: ChangedPasswordInput,
    @Ctx() context: MyContext
  ): Promise<User | null> {
    const userId = await redis.get(forgotPaswordPrefix + token);

    if (!userId) {
      return null;
    }

    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      return null;
    }

    await redis.del(forgotPaswordPrefix + token);

    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    context.req.userId = user.id;

    return user;
  }
}
