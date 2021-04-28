// GraphQL
import { Resolver, Mutation, Arg } from "type-graphql";

// Database
import { UserModel } from "@Model/user/User";

// Redis
import { redis } from "../../../Redis/index";
import { forgotPaswordPrefix } from "../../../Redis/redisPrefixe";

// UUID
import { v4 as uuid } from "uuid";

// Email
import { SendEmail } from "../../../Email/sendEmail";

// =================================================================================================

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string): Promise<boolean> {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return true;
    }

    const token = uuid();
    redis.set(forgotPaswordPrefix + token, `${user._id}`, "ex", 60 * 60 * 0.1);

    await SendEmail(email, `http://localhost:3000/validation/password/change/${token}`);

    return true;
  }
}
